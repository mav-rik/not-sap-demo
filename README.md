<div align="center">
  <img src="https://raw.githubusercontent.com/mav-rik/not-sap/main/docs/notsap.png" alt="NotSap Logo" width="100" />
  <h1>NOTSAPUI Demo</h1>
  <p>Demos for the <strong>notsapui</strong> and <strong>notsapodata</strong> libraries</p>
</div>

## Overview

This repo contrasts two ways to wire [notsapui](https://github.com/mav-rik/not-sap) into an OData-backed Vue app. Both demos target the public Northwind OData V2 service and ship the same flows so you can compare integrations.

**What both demos provide:**

- Generated TypeScript types for the OData model
- Smart tables with sorting, filtering, and pagination
- Read-only record dialogs (notsapodata supports full CRUD outside the demo)
- Minimal and Advanced views showing different code paths
- Light/dark theme toggle
- Responsive layouts out of the box

**Minimal View:**

<img src="./docs/table-record.gif" alt="Minimal View - Table and Record Details" />

**Advanced View with Filtering:**

<img src="./docs/adv-filters.gif" alt="Advanced View - Dynamic Filtering" />

## Two Approaches

### 🎁 Bundled Approach ([packages/bundled](https://github.com/mav-rik/not-sap-demo/tree/main/packages/bundled))

Prebuilt components with compiled CSS for a plug-and-play experience.

**Import components:**
```typescript
import { ODataEntitySet, SmartTable, SmartTableRoot } from 'notsapui'
import 'notsapui/styles.css'
```

**Key points:**
- Minimal dependencies (`notsapui`, `notsapodata`, Vue, Router)
- Fast start: import the CSS bundle and render
- No build config changes
- Styling tweaks limited to CSS variables or overrides
- Larger bundle because all styles ship together

[📖 Read bundled package documentation →](packages/bundled/README.md)

### 🔧 Integrated Approach ([packages/integrated](https://github.com/mav-rik/not-sap-demo/tree/main/packages/integrated))

Raw `.vue` components, UnoCSS utilities, and full theming control.

**Import components:**
```typescript
import ODataEntitySet from 'notsapui/ODataEntitySet.vue'
import SmartTable from 'notsapui/SmartTable.vue'
import SmartTableRoot from 'notsapui/SmartTableRoot.vue'
```

**Key points:**
- UnoCSS setup with `vunor`, `radix-vue`, `@tanstack/vue-virtual`, and friends
- Tree-shakable builds and smaller payloads
- Access to renderless slots for deep customization
- Needs UnoCSS configuration and extra peer deps

[📖 Read integrated package documentation →](packages/integrated/README.md)

## Which One to Use?

### Choose **Bundled** if:

- You are layering notsapui onto an existing styling stack
- Introducing UnoCSS would be disruptive
- You need a quick prototype or proof of concept
- Minimal configuration matters more than custom design
- Standard component visuals are acceptable

### Choose **Integrated** if:

- You control the design system or already use UnoCSS
- New projects benefit from granular styling
- Tree-shaking and bundle size are priorities
- You want full access to component internals
- You are comfortable managing extra peer dependencies

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

Serves `http://localhost:5173` (or the next open port).

### Run Integrated Demo

```sh
pnpm demo-integrated
```

Serves `http://localhost:5174` (or the next open port).

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

Both demos use Vue 3.5+, Vite (rolldown-vite), `notsapui`, `notsapodata`, Vue Router, and pnpm. The integrated demo layers in UnoCSS, Vunor, Radix Vue, and `@tanstack/vue-virtual`.

## Learn More

- [notsapui GitHub Repository](https://github.com/mav-rik/not-sap)

## License

MIT
