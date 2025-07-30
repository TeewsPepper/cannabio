# 🌿 CannaBIO — Cannabis Medicinal Orgánico e Industrial

Sitio web institucional desarrollado para **CannaBIO**, empresa especializada en el cultivo y producción de cannabis medicinal e industrial.  
Este proyecto fue diseñado para reflejar una estética limpia, profesional y en armonía con la identidad visual provista por el cliente.

---

## 🔧 Tecnologías utilizadas

- **React + TypeScript** (con Vite)
- **CSS Modules** para estilos encapsulados
- **Framer Motion** para animaciones suaves
- **EmailJS** para envío de formularios sin backend
- **Netlify** como plataforma de despliegue
- **SEO primario** con meta-tags OG y favicon
- Modal de **Políticas de Privacidad**

---

## 📁 Estructura del proyecto

```bash
.
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Servicios.tsx
│   │   ├── SobreNosotros.tsx
│   │   ├── Formulario.tsx
│   │   ├── Footer.tsx
│   │   └── Politicas.tsx
│   ├── styles/
│   │   ├── globals.module.css
│   │   └── [otros módulos].module.css
│   ├── App.tsx
│   └── main.tsx
├── README.md
└── vite.config.ts`
```

## Instrucciones de desarrollo local

```bash
npm install
npm run dev

```

- El formulario de contacto usa EmailJS. 
- Las credenciales están configuradas directamente en Formulario.tsx.
- Si deseas reemplazarlas, crea una cuenta en emailjs.com y actualiza los valores de servicio,    plantilla y usuario.

## Despliegue en producción

El sitio está desplegado en:
https://cannabios.netlify.app



📌 Notas adicionales

   - Las fuentes y colores fueron seleccionados según el branding entregado por el cliente.

   - Se incluye configuración SEO básica (favicon, meta-tags OG, título, descripción).

   - El modal de políticas de privacidad es visible desde el footer.