<div align="center">
  <img src="https://raw.githubusercontent.com/mav-rik/not-sap/main/notsap.png" alt="NotSap Logo" width="100" />
  <h1>NOTSAPUI Demo</h1>
  <p>Demo applications showcasing <strong>notsapui</strong> and <strong>notsapodata</strong> libraries</p>
</div>

## Overview

This monorepo demonstrates two different approaches to integrating the [notsapui](https://github.com/mav-rik/not-sap) component library with OData services. Both demo applications connect to the public Northwind OData V2 service and showcase identical functionality using different integration strategies.

**What both demos provide:**

- Full OData V2 integration with automatic TypeScript type generation
- Smart data tables with sorting, filtering, and pagination
- Record detail views (read-only in demo; notsapodata supports full CRUD operations)
- Minimal and Advanced views demonstrating different usage patterns
- Dark/light theme support
- Responsive layouts

**Minimal View:**

<img src="./docs/table-record.gif" alt="Minimal View - Table and Record Details" />

**Advanced View with Filtering:**

<img src="./docs/adv-filters.gif" alt="Advanced View - Dynamic Filtering" />

## Two Approaches

### 🎁 Bundled Approach ([packages/bundled](https://github.com/mav-rik/not-sap-demo/tree/main/packages/bundled))

**Plug-and-play solution** with pre-compiled components and styles.

**Import components:**
```typescript
import { ODataEntitySet, SmartTable, SmartTableRoot } from 'notsapui'
import 'notsapui/styles.css'
```

**Key characteristics:**
- ✅ Minimal dependencies (just `notsapui` + `notsapodata`)
- ✅ Quick setup - import CSS and start using
- ✅ No build configuration needed
- ✅ Predictable appearance across projects
- ❌ Limited styling customization
- ❌ Larger bundle size (includes all styles)

[📖 Read bundled package documentation →](https://github.com/mav-rik/not-sap-demo/blob/main/packages/bundled/README.md)

### 🔧 Integrated Approach ([packages/integrated](https://github.com/mav-rik/not-sap-demo/tree/main/packages/integrated))

**Full control solution** with raw `.vue` components and UnoCSS styling.

**Import components:**
```typescript
import ODataEntitySet from 'notsapui/ODataEntitySet.vue'
import SmartTable from 'notsapui/SmartTable.vue'
import SmartTableRoot from 'notsapui/SmartTableRoot.vue'
```

**Key characteristics:**
- ✅ Complete styling control via UnoCSS utilities
- ✅ Tree-shakeable - smaller production bundles
- ✅ Access to raw components for deep customization
- ✅ Modern tooling with Vite optimizations
- ❌ More dependencies (`vunor`, `radix-vue`, `@tanstack/vue-virtual`, etc.)
- ❌ Requires UnoCSS configuration
- ❌ More complex setup

[📖 Read integrated package documentation →](https://github.com/mav-rik/not-sap-demo/blob/main/packages/integrated/README.md)

## Which One to Use?

### Choose **Bundled** if:

- You're adding notsapui to an **existing project** with established CSS framework
- Adding UnoCSS would be **difficult or disruptive** to your current setup
- You want **quick prototyping** or proof-of-concept
- You prefer **minimal configuration** and dependencies
- You're okay with **standard component appearance**

### Choose **Integrated** if:

- You're starting a **new project** from scratch
- Your project **already uses UnoCSS** or you're open to adopting it
- You need **custom styling** and design system integration
- You want **maximum flexibility** in component customization
- You prefer **smaller bundle sizes** through tree-shaking

## Running the Demos

### Install Dependencies

From the repository root:

```sh
pnpm install
```

### Run Bundled Demo

```sh
pnpm demo-bundled
```

Opens at `http://localhost:5173` (or next available port)

### Run Integrated Demo

```sh
pnpm demo-integrated
```

Opens at `http://localhost:5174` (or next available port)

## Project Structure

```
not-sap-demo/
├── packages/
│   ├── bundled/          # Bundled approach demo
│   │   ├── src/
│   │   │   ├── views/
│   │   │   │   ├── Minimal.vue    # Simple table example
│   │   │   │   └── Advanced.vue   # Full-featured example
│   │   │   └── main.ts            # imports 'notsapui/styles.css'
│   │   └── README.md
│   │
│   └── integrated/       # Integrated approach demo
│       ├── src/
│       │   ├── views/
│       │   │   ├── Minimal.vue    # Simple table example
│       │   │   └── Advanced.vue   # Full-featured example
│       │   └── main.ts            # imports 'uno.css'
│       ├── uno.config.ts          # UnoCSS configuration
│       └── README.md
│
├── pnpm-workspace.yaml   # Workspace configuration
└── README.md             # This file
```

## Technology Stack

Both demos use:

- **Vue 3.5+** with Composition API and TypeScript
- **Vite** (rolldown-vite) - Rust-based bundler
- **notsapui** - UI component library for SAP-like interfaces
- **notsapodata** - OData client library with automatic type generation
- **Vue Router** - Client-side routing
- **pnpm** - Package manager

Integrated demo additionally uses:

- **UnoCSS** - Atomic CSS engine
- **vunor** - UnoCSS-based component library
- **radix-vue** - Headless component primitives
- **@tanstack/vue-virtual** - Virtual scrolling

## Learn More

- [notsapui GitHub Repository](https://github.com/mav-rik/not-sap) - UI component library

## License

MIT
