<!-- ══════════════════════════ PORTADA ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="marknote"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-555555?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-1987F0?style=for-the-badge" alt="Español"/></a>
</div>

<div align="center">
  <img src="assets/banner.svg" width="100%" alt="marknote"/>
</div>

<h1 align="center">marknote</h1>
<p align="center"><em>App de notas Markdown rápida, con preview en vivo lado a lado</em></p>
<p align="center"><strong>Escribe → preview renderizado en tiempo real → todo guardado automáticamente en el navegador</strong></p>

<div align="center">
<a href="https://github.com/geoggrigori/marknote/actions/workflows/ci.yml"><img src="https://github.com/geoggrigori/marknote/actions/workflows/ci.yml/badge.svg" alt="CI"/></a>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="vite"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#acerca-de"><img src="https://img.shields.io/badge/▸_ACERCA_DE-1987F0?style=for-the-badge" alt="acerca"/></a>
<a href="#funcionalidades"><img src="https://img.shields.io/badge/▸_FUNCIONALIDADES-000000?style=for-the-badge" alt="func"/></a>
<a href="#arquitectura"><img src="https://img.shields.io/badge/▸_ARQUITECTURA-1987F0?style=for-the-badge" alt="arquitectura"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 💾 **Sin cuenta, sin backend.** Todo se guarda en el `localStorage` de tu navegador — nada se envía a ningún lado.

<div align="center">
  <img src="assets/screenshot.png" width="100%" alt="marknote — preview en vivo"/>
</div>

## Acerca de

**marknote** es una app de notas Markdown limpia y rápida, con preview en vivo lado a lado. Escribe a la izquierda, ve el HTML renderizado a la derecha, con todo guardado automáticamente en el navegador.

## Funcionalidades

- 📝 **Preview en vivo** — Markdown renderizado mientras escribes.
- 🗂️ **Gestión de notas** — crear, seleccionar, editar y eliminar desde la barra lateral.
- 🔍 **Búsqueda full-text** — filtra notas por título o contenido al instante.
- 🔢 **Conteo de palabras/caracteres** en vivo.
- ⬇️ **Exportar como `.md`** con un clic.
- 🌓 **Tema claro/oscuro** — tu elección se recuerda.
- 🛡️ **Renderizado seguro** — Markdown parseado con [`marked`](https://marked.js.org) y sanitizado con [`DOMPurify`](https://github.com/cure53/DOMPurify) contra XSS.

## Arquitectura

```mermaid
flowchart TD
    App[App]
    App --> Sidebar[Sidebar]
    App --> Editor[Editor]
    App --> Preview[Preview]
    App --> useNotes[hook useNotes]
    App --> useTheme[hook useTheme]
    Sidebar -->|seleccionar / crear / eliminar / buscar| useNotes
    Editor -->|editar cuerpo| useNotes
    Preview -->|renderMarkdown + sanitize| Markdown[lib/markdown]
    useNotes -->|helpers CRUD| Notes[lib/notes]
    useNotes <-->|cargar / guardar| Storage[localStorage]
    useTheme <-->|persistir tema| Storage
```

Los componentes de UI son presentacionales. Toda la lógica CRUD de notas vive en helpers puros y testeables en `src/lib/notes.ts`, orquestados por el hook `useNotes`, que también maneja la persistencia vía `src/lib/storage.ts`.

## Uso

```bash
git clone https://github.com/geoggrigori/marknote.git
cd marknote
npm install
npm run dev
```

Abre la URL impresa (usualmente `http://localhost:5173`). En la primera ejecución, se crean algunas notas de ejemplo automáticamente.

```bash
npm run build     # type-check + build optimizado en dist/
npm run test      # pruebas (Vitest + Testing Library)
```

## Licencia

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desarrollado por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
