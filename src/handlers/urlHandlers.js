import api from '../api/axios';

export const fetchUrls = async (userId, setUrls, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await api.get(`/url/user/${userId}`);
    setUrls(response.data.map(url => ({
      ...url,
      shortUrl: `${url.shortUrl}`,
    })));
  } catch (error) {
    console.error('Error fetching URLs', error);
    setError('Error fetching URLs. Please try again.');
  }
  setLoading(false);
};

export const handleSubmit = async (originalUrl, urls, setUrls, setError, setLoading) => {
  setError('');
  setLoading(true);

  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const validOriginalUrl = ensureValidUrl(originalUrl);

  try {
    const response = await api.post('/url/shorten', { originalUrl: validOriginalUrl, userId });
    setUrls([...urls, {
      ...response.data,
      shortUrl: `${response.data.shortUrl}`,
    }]);
  } catch (error) {
    console.error('Error shortening URL', error);
    setError(error.response?.data?.error || 'Error shortening URL. Please try again.');
  }
  setLoading(false);
};

export const handleDelete = async (id, urls, setUrls, setLoading, setError) => {
  setLoading(true);
  try {
    await api.delete(`/url/delete/${id}`);
    setUrls(urls.filter((url) => url._id !== id));
  } catch (error) {
    console.error('Error deleting URL', error);
    setError('Error deleting URL. Please try again.');
  }
  setLoading(false);
};

export const handleUpdate = async (e, editingUrl, newOriginalUrl, urls, setUrls, setEditingUrl, setNewOriginalUrl, setLoading, setError) => {
  e.preventDefault();
  setLoading(true);
  const validNewOriginalUrl = ensureValidUrl(newOriginalUrl);
  try {
    const response = await api.put(`/url/update/${editingUrl._id}`, { originalUrl: validNewOriginalUrl });
    const updatedUrl = {
      ...response.data,
      shortUrl: `${response.data.shortUrl}`
    };
    setUrls(urls.map((url) => (url._id === editingUrl._id ? updatedUrl : url)));
    setEditingUrl(null);
    setNewOriginalUrl('');
  } catch (error) {
    console.error('Error updating URL', error);
    setError('Error updating URL. Please try again.');
  }
  setLoading(false);
};

export const handleEdit = (url, setEditingUrl, setNewOriginalUrl) => {
  setEditingUrl(url);
  setNewOriginalUrl(url.originalUrl);
};

export const handleCancel = (setEditingUrl, setNewOriginalUrl) => {
  setEditingUrl(null);
  setNewOriginalUrl('');
};

const ensureValidUrl = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
};
