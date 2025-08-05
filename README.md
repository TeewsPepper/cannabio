# Proyecto: Transmisión Privada - Autenticación con Google OAuth2

## 📌 Descripción

Este sistema permite el acceso restringido a una página de transmisión privada mediante autenticación con Google OAuth2. Solo los usuarios cuyo correo electrónico esté autorizado podrán acceder a la sección protegida `/transmision`.

El sistema consta de un frontend en **React (Vite)** y un backend en **Node.js + Express**, desplegados respectivamente en **Netlify** y **Render**.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express + Passport.js + express-session
- **Autenticación**: Passport-Google-OAuth20
- **Despliegue**: Netlify (frontend) + Render (backend)
- **Persistencia de sesión**: Cookies (con SameSite=None; Secure)

---

## 🔐 Flujo de Autenticación

1. El usuario ingresa a la ruta `/transmision` del frontend.
2. Si no hay sesión activa, se le redirige al backend a `/auth/google`.
3. Se autentica con su cuenta de Google.
4. Passport verifica si el correo del usuario está en la lista de usuarios autorizados (`AUTHORIZED_USERS`).
5. Si está autorizado:
   - Se crea una sesión persistente.
   - Se devuelve una cookie de sesión al navegador.
6. El frontend consulta `/api/session` para validar si el usuario está autenticado.
7. Si está autorizado, se muestra el contenido (iframe de transmisión).
8. Si no está autorizado, se muestra el mensaje "Acceso denegado".

## 🌐 Consideraciones por Navegador

- Chrome: funcionamiento normal con cookies de sesión entre dominios (Netlify + Render).

- Firefox: la Protección Total contra Cookies bloquea las cookies de sesión cross-site, lo que impide la autenticación.

## 🔧 Recomendación para Firefox

Solicitar a los usuarios que:

- Usen Chrome o Edge, o

- Desactiven temporalmente la Protección Total contra Cookies en Firefox para el sitio de Netlify:

- Clic en el icono de escudo en la barra de direcciones.

- Desactivar protección para este sitio.

---

## ⚠️ Restricción de Usuarios

Solo se permite el acceso a una **lista fija de correos autorizados**, definidos mediante la variable de entorno `AUTHORIZED_USERS`.

**Formato de la variable**:

```bash
AUTHORIZED_USERS=usuario1@gmail.com,usuario2@gmail.com,usuario3@empresa.com
```

## ➕ Agregar más correos autorizados

Solo debes **actualizar la variable AUTHORIZED_USERS** en Render(asegúrate de no incluir espacios):

```bash
AUTHORIZED_USERS=usuario1@gmail.com,usuario2@gmail.com,usuario3@empresa.com,nuevousuario@dominio.com
```
## 📁 Estructura del Proyecto

- Este proyecto está compuesto por dos partes principales:

1.  Backend (Node.js + TypeScript + Express + Passport.js)

```bash

backend/
├── dist/                         # Archivos compilados de TypeScript (output)
├── node_modules/                # Dependencias instaladas por npm
├── src/                         # Código fuente principal
│   ├── auth/                    # Lógica de autenticación con Google
│   │   └── passport.ts         # Configuración de estrategia Google OAuth
│   │
│   ├── middleware/             # Middlewares personalizados
│   │   └── ensureAuthenticated.ts  # Middleware para verificar sesión
│   │
│   ├── types/                  # Tipados personalizados para Express
│   │   └── express/
│   │       └── index.d.ts      # Extiende los tipos de Request con sesión
│   │
│   └── utils/                  # Utilidades varias del proyecto
│       └── env.ts              # Carga y validación de variables de entorno
│
├── app.ts                      # Archivo principal que configura Express y middlewares
├── .env                        # Variables de entorno para desarrollo
├── .env.production             # Variables de entorno para producción
├── .gitignore                  # Ignora archivos y carpetas para Git
├── package.json                # Dependencias, scripts y metadatos del backend
├── package-lock.json           # Lockfile de npm
└── tsconfig.json               # Configuración de TypeScript
```

2.  Frontend ./ (Root del repo con React + TypeScript + Vite).

```bash

├── dist/
├── public/                     # Archivos estáticos públicos
├── src/                        # Código fuente principal
│   ├── assets/                # Recursos gráficos (imágenes, íconos, etc.)
│   │
│   ├── components/            # Componentes reutilizables de React
│   │   ├── AccesoDenegado.tsx      # Página para acceso no autorizado
│   │   ├── Footer.tsx              # Pie de página
│   │   ├── Formulario.tsx         # Formulario (ej: contacto)
│   │   ├── Header.tsx             # Encabezado / Navbar
│   │   ├── Hero.tsx               # Sección principal (landing)
│   │   ├── Politica.tsx           # Página de políticas
│   │   ├── RutaProtegida.tsx      # Componente de rutas privadas
│   │   ├── Servicios.tsx          # Sección de servicios
│   │   ├── SobreNosotros.tsx      # Sección informativa sobre la empresa
│   │   └── YouTubeEmbed.tsx       # Componente para embebido de YouTube
│   │
│   ├── styles/                # Estilos generales en CSS Modules
│   │   └── *.module.css
│   │
│   ├── App.tsx                # Componente raíz
│   ├── Home.tsx               # Página de inicio
│   ├── index.css              # Estilos globales
│   ├── main.tsx               # Entry point de React
│   ├── Transmision.tsx        # Página de transmisión en vivo (restringida)
│   └── vite-env.d.ts          # Tipado de Vite para TypeScript
│
├── .env                       # Variables de entorno para desarrollo
├── .env.production            # Variables de entorno para producción
├── .gitignore                 # Ignora archivos para Git
├── index.html                 # HTML base que sirve Vite
├── netlify.toml               # Configuración de despliegue en Netlify
├── package.json               # Dependencias y scripts del frontend
├── package-lock.json          # Lockfile de npm
├── README.md                  # Documentación general del proyecto
├── tsconfig.json              # Configuración de TypeScript
├── tsconfig.app.json          # Configuración específica para app
├── tsconfig.node.json         # Configuración específica para entornos node
└── vite.config.ts             # Configuración de Vite
```

- El formulario de contacto usa EmailJS.
- Las credenciales están configuradas directamente en Formulario.tsx.
- Si deseas reemplazarlas, crea una cuenta en emailjs.com y actualiza los valores de servicio, plantilla y usuario.

## 🚀 Despliegue

### Frontend (Netlify)

   - Asegúrate de definir esta variable en Site Settings > Environment Variables:

```bash
   VITE_BACKEND_URL=https://tubackend.onrender.com
```

### Backend (Render)

   - Variables requeridas:

```bash
  GOOGLE_CLIENT_ID=...
  GOOGLE_CLIENT_SECRET=...
  SESSION_SECRET=una_clave_segura_y_unica
  AUTHORIZED_USERS=correo1@gmail.com,correo2@dominio.com
  FRONTEND_URL=https://tusitio.netlify.app
```



📌 Notas adicionales

   - Las fuentes y colores fueron seleccionados según el branding entregado por el cliente.

   - Se incluye configuración SEO básica (favicon, meta-tags OG, título, descripción).

   - El modal de políticas de privacidad es visible desde el footer.

