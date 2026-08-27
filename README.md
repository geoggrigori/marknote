<!-- ══════════════════════════ TÍTULO ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="marknote"/>
</div>

<br/>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-1987F0?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-555555?style=for-the-badge" alt="Español"/></a>
</div>

<br/>

<h1 align="center">marknote</h1>
<p align="center"><em>App de notas Markdown rápido, com preview ao vivo lado a lado</em></p>
<p align="center"><strong>Escreva → preview renderizado em tempo real → tudo salvo automaticamente no navegador</strong></p>

<div align="center">
<a href="https://github.com/geoggrigori/marknote/actions/workflows/ci.yml"><img src="https://github.com/geoggrigori/marknote/actions/workflows/ci.yml/badge.svg" alt="CI"/></a>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="vite"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#sobre"><img src="https://img.shields.io/badge/▸_SOBRE-1987F0?style=for-the-badge" alt="sobre"/></a>
<a href="#funcionalidades"><img src="https://img.shields.io/badge/▸_FUNCIONALIDADES-000000?style=for-the-badge" alt="func"/></a>
<a href="#arquitetura"><img src="https://img.shields.io/badge/▸_ARQUITETURA-1987F0?style=for-the-badge" alt="arquitetura"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 💾 **Sem conta, sem backend.** Tudo fica salvo no `localStorage` do seu navegador — nada é enviado a lugar nenhum.

<div align="center">
  <img src="assets/screenshot.png" width="100%" alt="marknote — preview ao vivo"/>
</div>

## Sobre

**marknote** é um app de notas Markdown limpo e rápido, com preview lado a lado ao vivo. Escreva à esquerda, veja o HTML renderizado à direita, com tudo salvo automaticamente no navegador.

## Funcionalidades

- 📝 **Preview ao vivo** — Markdown renderizado enquanto você digita.
- 🗂️ **Gestão de notas** — criar, selecionar, editar e excluir pela sidebar.
- 🔍 **Busca full-text** — filtra notas por título ou conteúdo instantaneamente.
- 🔢 **Contagem de palavras/caracteres** ao vivo.
- ⬇️ **Exportar como `.md`** com um clique.
- 🌓 **Tema claro/escuro** — sua escolha é lembrada.
- 🛡️ **Renderização segura** — Markdown parseado com [`marked`](https://marked.js.org) e sanitizado com [`DOMPurify`](https://github.com/cure53/DOMPurify) contra XSS.

## Arquitetura

```mermaid
flowchart TD
    App[App]
    App --> Sidebar[Sidebar]
    App --> Editor[Editor]
    App --> Preview[Preview]
    App --> useNotes[hook useNotes]
    App --> useTheme[hook useTheme]
    Sidebar -->|selecionar / criar / excluir / buscar| useNotes
    Editor -->|editar corpo| useNotes
    Preview -->|renderMarkdown + sanitize| Markdown[lib/markdown]
    useNotes -->|helpers CRUD| Notes[lib/notes]
    useNotes <-->|carregar / salvar| Storage[localStorage]
    useTheme <-->|persistir tema| Storage
```

Os componentes de UI são apresentacionais. Toda a lógica CRUD de notas vive em helpers puros e testáveis em `src/lib/notes.ts`, orquestrados pelo hook `useNotes`, que também cuida da persistência via `src/lib/storage.ts`.

## Uso

```bash
git clone https://github.com/geoggrigori/marknote.git
cd marknote
npm install
npm run dev
```

Abra a URL impressa (geralmente `http://localhost:5173`). Na primeira execução, algumas notas de exemplo são criadas automaticamente.

```bash
npm run build     # type-check + build otimizado em dist/
npm run test      # testes (Vitest + Testing Library)
```

## Licença

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desenvolvido por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
