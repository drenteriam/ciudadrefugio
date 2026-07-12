# Iglesia Cristiana Ciudad de Refugio

Sitio web estático, responsivo y gratuito, preparado para publicarse en GitHub Pages.

## Contenido incluido

- Inicio
- Nosotros
- Horarios
- Eventos dinámicos
- Galería
- Predicaciones
- Blog
- Contacto

## Eventos automáticos

El archivo `script.js` calcula y muestra automáticamente las próximas reuniones:

- Viernes a las 7:00 PM
- Domingo a las 11:00 AM

No necesitas actualizar las fechas cada semana.

Para agregar un evento especial, edita `specialEvents` en `script.js`:

```js
const specialEvents = [
  {
    date: "2026-08-15T18:00:00",
    title: "Conferencia familiar",
    description: "Entrada libre"
  }
];
```

## Personalización pendiente

Busca y reemplaza en `index.html`:

- `Agrega aquí la dirección de la iglesia`
- `Agrega aquí el teléfono`
- `contacto@ciudadderefugio.org`
- Enlaces `href="#"` de Facebook, Instagram, YouTube, artículos y predicaciones
- Imágenes SVG de ejemplo por fotografías reales

## Publicar gratis en GitHub Pages

1. Crea una cuenta en GitHub.
2. Crea un repositorio público, por ejemplo `iglesia-ciudad-de-refugio`.
3. Sube todos los archivos de esta carpeta a la raíz del repositorio.
4. En GitHub abre `Settings` → `Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Selecciona la rama `main` y la carpeta `/root`.
7. Guarda los cambios.

La dirección tendrá un formato parecido a:

`https://TU-USUARIO.github.io/iglesia-ciudad-de-refugio/`

## Ver localmente

Abre `index.html` directamente en el navegador o ejecuta:

```bash
python3 -m http.server 8080
```

Después visita `http://localhost:8080`.

## Formulario de contacto

Actualmente abre la aplicación de correo del visitante mediante `mailto:`. Para recibir mensajes sin mostrar un correo, puedes sustituirlo por un Google Form embebido.
