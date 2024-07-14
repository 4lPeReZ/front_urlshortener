# Linkly: Servicio de Acortamiento de URLs

Linkly es un servicio de acortamiento de URLs que permite a los usuarios acortar enlaces largos, gestionar sus enlaces acortados y registrarse/iniciar sesión para tener acceso a funcionalidades adicionales. El servicio facilita una experiencia de navegación más eficiente y organizada.

## Funcionalidades Principales

- **Registro e Inicio de Sesión**: Los usuarios pueden crear una cuenta y autenticarse para acceder a sus enlaces acortados.
- **Acortar URLs**: Los usuarios pueden introducir una URL larga y obtener una versión más corta.
- **Gestión de URLs**: Los usuarios autenticados pueden ver, editar y eliminar sus enlaces acortados. También pueden ver estadísticas como el número de clics en cada enlace.
- **Interfaz Intuitiva**: La aplicación presenta una interfaz amigable y moderna, optimizada tanto para escritorio como para dispositivos móviles.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **React Router**: Librería para manejo de rutas en una aplicación de React.
- **Tailwind CSS**: Framework de CSS para diseñar rápidamente interfaces modernas y responsivas.
- **State Management con Hooks**: Uso de `useState` y `useEffect` para manejar el estado y efectos secundarios en los componentes.
- **SVG Icons**: Uso de íconos SVG para una mejor experiencia visual y performance.
- **Sanitización de Inputs**: Implementación de funciones de sanitización para email y contraseña para mejorar la seguridad.
- **Componentes Modales**: Uso de componentes modales personalizados para mostrar mensajes y confirmaciones al usuario.

## Estructura de Componentes

- **RegisterPage**: Página de registro de usuarios con validación y sanitización de inputs.
- **AuthForm**: Formulario reutilizable para registro e inicio de sesión.
- **URLForm**: Formulario para acortar URLs, incluye validación y sanitización de inputs.
- **CustomModal**: Modal personalizado para mostrar mensajes y permitir la interacción del usuario.
- **Header**: Encabezado de la aplicación que incluye navegación y control de sesión de usuario.
- **URLList**: Lista de URLs acortadas con opciones de edición y eliminación.
- **URLItem**: Elemento individual de la lista de URLs, mostrando detalles y acciones disponibles.

Este archivo `README.md` proporciona una descripción clara y completa de tu proyecto, sus características, tecnologías utilizadas, configuración y estructura de componentes. Puedes personalizarlo según tus necesidades para incluir más detalles específicos.