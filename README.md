# Concesionaria - Página Web
[PDF CON LA CONSIGNA DE PARCIALES](https://github.com/valentinlaplume/Web_Concesionaria_Labo3/blob/master/Segundo%20parcial%20-%202022%20-%20Tema1.pdf)

Esta página web es una plataforma para una concesionaria de autos, donde se pueden publicar anuncios de los vehículos disponibles para la venta.
Los usuarios pueden ver la lista de autos, buscar por filtros específicos y agregar nuevos anuncios.
La información sobre los anuncios se almacena en el navegador del usuario utilizando localStorage, lo que permite que los datos persistan incluso después de cerrar la página.

##**Funcionalidades Principales**
-Lista de Autos: Los usuarios pueden ver una lista de autos disponibles para la venta, con detalles como la marca, modelo, año, precio, etc.
-Filtros de Búsqueda: Se pueden aplicar filtros de búsqueda para encontrar autos específicos según ciertos criterios, como marca, modelo, rango de precios, etc.
-Publicar Anuncios: Los usuarios pueden agregar nuevos anuncios de autos a la lista, proporcionando la información relevante, como la marca, modelo, año, precio, etc.
-LocalStorage: Los datos de los anuncios se almacenan en el localStorage del navegador, lo que garantiza que los anuncios persistan incluso después de cerrar la página o actualizarla.
-Almacenamiento en Node.js y archivos JSON: Los datos también se guardan en el servidor mediante Node.js y archivos JSON.

##**Requisitos**
**Para ejecutar la página web en un entorno local, necesitarás lo siguiente:**
-Node.js instalado en tu máquina local.
-Un navegador web moderno, como Google Chrome, Mozilla Firefox, u otro compatible con HTML, CSS y JavaScript.

##**Instalación y Uso**
-Clona el repositorio en tu máquina local o descarga los archivos del proyecto.
-Navega a la carpeta del proyecto y abre el archivo index.html en tu navegador.
-Ahora puedes explorar la página web y probar las diferentes funcionalidades, como ver la lista de autos, realizar búsquedas y agregar nuevos anuncios.

###**Cómo funciona el localStorage
La página web utiliza el objeto localStorage de JavaScript para almacenar los datos de los anuncios localmente en el navegador del usuario. 
Cada vez que un nuevo anuncio es agregado o se actualiza la lista de autos, los datos se guardan en el localStorage. 
Esto permite que los anuncios persistan incluso después de cerrar la página. 
Sin embargo, ten en cuenta que el localStorage tiene un límite de almacenamiento (generalmente 5-10 MB), por lo que es importante no exceder este límite.
