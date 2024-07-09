import api from '../api/axios';

export const handleLogin = async (credentials, setIsLoggedIn, setUser, setError, setModalMessage) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { userId, username, token } = response.data;

    if (!userId || !username) throw new Error('User data is missing');

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ _id: userId, name: username }));

    setIsLoggedIn(true);
    setUser({ _id: userId, name: username });

    setModalMessage("Login successful!");
    setError(null);
  } catch (error) {
    console.error('Error during login', error);
    setError('Invalid email or password. Please try again.');
    setModalMessage('Invalid email or password. Please try again.');
  }
};

export const handleRegister = async (userInfo, setIsLoggedIn, setUser, setError, setModalMessage) => {
  try {
    const response = await api.post('/auth/register', userInfo);
    const { userId, username, token } = response.data;

    if (!userId || !username) throw new Error('User data is missing');

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ _id: userId, name: username }));

    setIsLoggedIn(true);
    setUser({ _id: userId, name: username });

    setModalMessage("Registration successful! Redirecting to login...");
    setError(null);
  } catch (error) {
    console.error('Error during registration', error);
    setError('Error during registration. Please try again.');
    setModalMessage('Error during registration. Please try again.');
  }
};

export const handleLogout = (setIsLoggedIn, setUser, navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setIsLoggedIn(false);
  setUser({ _id: '', name: '' });
  navigate('/');
};
