# Accesibilidad Web - Menú de Accesibilidad

Herramienta **open source** para mejorar la accesibilidad e inclusión en sitios web mediante un **menú flotante de herramientas de accesibilidad**.

Este proyecto permite integrar fácilmente controles que ayudan a mejorar la experiencia de usuarios con baja visión, dificultades de lectura o necesidades de accesibilidad.
---

## 📑 Tabla de Contenido

- [Objetivo](#objetivo)
- [Funcionalidades](#funcionalidades)
- [Inspiración](#inspiración)
- [Enfoque técnico](#enfoque-técnico)
- [Instalación](#instalación)
- [Uso en WordPress](#uso-en-wordpress)
- [Accesibilidad](#accesibilidad)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## 🌍 Objetivo

El objetivo de este proyecto es facilitar a desarrolladores la implementación de herramientas básicas de **accesibilidad web** que permitan adaptar la interfaz a las necesidades de diferentes usuarios.

Muchas páginas web aún carecen de funcionalidades simples que pueden marcar una gran diferencia en la experiencia de personas con discapacidades visuales o cognitivas.

Este proyecto busca aportar una solución **simple, reutilizable y open source** para fomentar una web más inclusiva.

---

## ✨ Funcionalidades

El menú flotante incluye herramientas como:

- Aumentar tamaño de fuente
- Disminuir tamaño de fuente
- Ajustar espaciado entre líneas
- Ajustar espaciado entre palabras
- Resaltar enlaces
- Escala de grises
- Alto contraste
- Máscara de lectura
- Guía de lectura
- Cursor grande
- Tipografía optimizada para dislexia
- Lector de pantalla

---

## 💡 Inspiración

Este proyecto toma como referencia conceptual las herramientas de accesibilidad implementadas en algunos portales institucionales del Gobierno de México.

Sin embargo, **no es una copia del código original**.

La implementación fue **completamente refactorizada y modernizada**, con el objetivo de crear una solución más mantenible y adaptable a proyectos actuales.

---

## ⚙️ Enfoque técnico

A diferencia de implementaciones anteriores, este proyecto:

- Utiliza **JavaScript moderno**
- Implementa **ES Modules**
- Elimina dependencias externas
- No utiliza **jQuery**
- Mantiene una estructura modular y mantenible

Esto permite integrarlo fácilmente en proyectos modernos de desarrollo web.

---
## 🛠️ Instalación

### Estructura del proyecto
```text
├── assets/
│   ├── js/
│   │   └── accessibility/
│   │       ├── index.js
│   │       ├── AccessibilityApp.js
│   │       ├── core/
│   │       │   ├── stateManager.js
│   │       │   └── storage.js
│   │       └── features/
│   │           ├── grayscale.js
│   │           ├── contrast.js
│   │           ├── cursorSize.js
│   │           ├── readingMask.js
│   │           ├── readingGuide.js
│   │           ├── dyslexiaFont.js
│   │           ├── verticalSpacing.js
│   │           ├── horizontalSpacing.js
│   │           ├── highlightLinks.js
│   │           ├── screenReader.js
│   │           └── fontSize.js
│   │
│   ├── css/
│   │   └── accessibility.css
│   │
│   └── fonts/
│       └── OpenDyslexic-Regular.woff2
│
└── index.html
```
### Agregar estilos y scripts

Para que el menú funcione correctamente, agrega **el CSS en la sección `<head>`** de tu HTML y **el JS al final del `<body>`**

#### 1️⃣ Estilos (CSS)

```html
<!-- En la sección <head> de tu HTML -->
<link rel="stylesheet" href="/assets/css/accessibility.css">
```
#### 2️⃣ Script (JS)
```html
<!-- Antes de cerrar la etiqueta </body> -->
<script type="module" src="/assets/js/accessibility/index.js"></script>
```
---
## Uso en WordPress
#### Estructura del proyecto
```text
/wp-content/themes/tema/
│
├── assets/
│   ├── js/
│   │   └── accessibility/
│   │       ├── index.js
│   │       ├── AccessibilityApp.js
│   │       ├── core/
│   │       │   ├── stateManager.js
│   │       │   └── storage.js
│   │       └── features/
│   │           ├── grayscale.js
│   │           ├── contrast.js
│   │           ├── cursorSize.js
│   │           ├── readingMask.js
│   │           ├── readingGuide.js
│   │           ├── dyslexiaFont.js
│   │           ├── verticalSpacing.js
│   │           ├── horizontalSpacing.js
│   │           ├── highlightLinks.js
│   │           ├── screenReader.js
│   │           └── fontSize.js
│   │
│   ├── css/
│   │   └── accessibility.css
│   │
│   └── fonts/
│       └── OpenDyslexic-Regular.woff2
│
└── functions.php
```
### Agregar el html del menú preferentemente en el HEAD del tema (se recomienda usar un tema hijo)

En `functions.php` agrega el siguiente codigo
```php
// ================= Accesibilidad
function theme_accessibility_assets() {

    wp_enqueue_style(
        'theme-accessibility',
        get_stylesheet_directory_uri() . '/assets/css/accessibility.css',
        [],
        '1.0'
    );

    wp_enqueue_script(
        'theme-accessibility',
        get_stylesheet_directory_uri() . '/assets/js/accessibility/index.js',
        [],
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'theme_accessibility_assets');

add_filter('script_loader_tag', function ($tag, $handle, $src) {

    if ($handle === 'theme-accessibility') {
        return '<script type="module" src="' . esc_url($src) . '"></script>';
    }

    return $tag;

}, 10, 3);
// ================= Fin Accesibilidad
```
---

## ♿ Accesibilidad

El proyecto busca alinearse con los principios de accesibilidad establecidos por las **Web Content Accessibility Guidelines (WCAG)**, promoviendo una web más inclusiva y usable para todas las personas.

---

## 🤝 Contribuciones

Las contribuciones de la comunidad son bienvenidas.

Si deseas mejorar el proyecto puedes:

- Abrir un **Issue**
- Proponer nuevas funcionalidades
- Enviar un **Pull Request**

La idea es construir una herramienta colaborativa que pueda ayudar a mejorar la accesibilidad en la web.

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia **MIT**, lo que permite su uso, modificación y distribución libre.
<p align="center">
Iniciativa open source creada por Jonathan Miranda con ❤️
</p>
