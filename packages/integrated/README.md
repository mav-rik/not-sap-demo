# Integrated Demo - notsapui + notsapodata

This demo also targets the Northwind OData V2 service, but imports raw `notsapui` components so you can wire them into your own UnoCSS-powered design system.

## Two Demo Views

### 1. Minimal View ([src/views/Minimal.vue](src/views/Minimal.vue))

- Fetches data on mount with `query-on-mount`
- Clicking a row opens the read-only record dialog
- Columns come from the generated OData metadata
- Mirrors the bundled demo with integrated styling

<img src="../../docs/table-record.gif" alt="Minimal View Demo" />

**Key takeaway**: same table experience, now fully themeable.

### 2. Advanced View ([src/views/Advanced.vue](src/views/Advanced.vue))

**Dynamic filtering with `SmartTableFilters`:**

<img src="../../docs/adv-filters.gif" alt="Dynamic Filtering" />

- Checkbox multi-select and sidebar filter layout
- Column chooser dialog to control visible fields
- Double-click a row to open the record dialog

<img src="../../docs/adv-columns.gif" alt="Column Configuration" />
<img src="../../docs/adv-record.gif" alt="Record Details" />

**Renderless scope access:**
- `queryImmediate()`, `resetFilters()`, `showConfigDialog()` helpers
- `querying`, `inlineCount`, `loadedCount`, `results` state

**Two-way bindings:**
- `columns-names`, `filters-names`, `fields-filters`, `selected-rows`

**Key takeaway**: combine custom layouts with notsapui’s data plumbing.

## The Integrated Approach Explained

### Component Imports

```typescript
import ODataEntitySet from 'notsapui/ODataEntitySet.vue'
import SmartTableRoot from 'notsapui/SmartTableRoot.vue'
import SmartTable from 'notsapui/SmartTable.vue'
import SmartTableFilters from 'notsapui/SmartTableFilters.vue'
import SmartRecordDialog from 'notsapui/SmartRecordDialog.vue'
```

Baking components into your build enables tree-shaking and deeper customization.

### Why These Dependencies?

```json
{
  "dependencies": {
    "notsapui": "^0.0.11",
    "notsapodata": "^0.0.11",
    "vunor": "^0.0.29",
    "radix-vue": "^1.9.17",
    "@internationalized/date": "^3.9.0",
    "@tanstack/vue-virtual": "^3.13.12"
  }
}
```

- `vunor` supplies UnoCSS presets and design tokens
- `radix-vue` provides the headless primitives Vunor builds on
- `@internationalized/date` powers date handling inside components
- `@tanstack/vue-virtual` enables performant virtual scrolling

### Styling Setup

The integrated approach requires UnoCSS configuration to style the raw components.

#### UnoCSS Configuration

```typescript
// uno.config.ts
import { defineConfig, type Preset } from 'unocss'
import { presetVunor, vunorShortcuts } from 'vunor/theme'
import { notSapUiVunorShortcuts } from 'notsapui/vunor'
import { notSapIconsPreset } from 'notsapui/icons'

export default defineConfig({
  presets: [
    presetVunor({ baseRadius: '0.25em' }) as Preset,
    notSapIconsPreset({
      // Override default icons (optional)
      'light-mode': 'line-md:light-dark-loop',
      'dark-mode': 'line-md:light-dark-loop',
      'details': 'ix:jigsaw-details-filled',
      'minimal': 'streamline-plump:table',
      'advanced': 'si:dashboard-vert-fill',
    }),
  ],
  shortcuts: [vunorShortcuts(notSapUiVunorShortcuts)]
})
```

**Configuration breakdown:**

- `presetVunor()` - Core design tokens and utilities
- `notSapIconsPreset()` - Icon collection from [Iconify](https://icon-sets.iconify.design/)
- `vunorShortcuts(notSapUiVunorShortcuts)` - Component styling shortcuts

UnoCSS generates utilities and shortcuts that notsapui expects; without them the components lack styling.

#### Icons

`notSapIconsPreset` provides default icons used by notsapui components. All icons come from [Iconify](https://icon-sets.iconify.design/).

**Override default icons:**
```typescript
notSapIconsPreset({
  'refresh': 'mdi:refresh',  // Override default refresh icon
  'search': 'mdi:magnify',   // Find icons at icon-sets.iconify.design
})
```

**Add custom icons:**
```typescript
notSapIconsPreset({
  'my-custom-icon': 'mdi:star',  // Use as: i--my-custom-icon
})
```

**Use icons in templates:**
```vue
<div class="i--refresh" />
<div class="i--search" />
<div class="i--my-custom-icon" />
```

The `i--<icon-name>` class pattern applies the corresponding icon.

### Vite Plugin Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import notSapODataVitePlugin from 'notsapodata/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    notSapODataVitePlugin({
      services: {
        NORTHWIND_V2: {
          alias: 'NorthwindModel',
          path: '/V2/Northwind/Northwind.svc',
        },
      },
    }),
  ],
})
```

### Application Entry Point

```typescript
// main.ts
import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import App from './App.vue'
import router from './router'
import 'uno.css'

createApp(App).use(router).mount('#app')
```

## Benefits of the Integrated Approach

- Full styling control through UnoCSS tokens and utilities
- Smaller bundles thanks to tree-shaking
- Direct access to renderless scopes and component internals
- Modern build pipeline with Vite + UnoCSS

## Trade-offs

- Requires UnoCSS configuration and peer dependency management
- Slightly heavier build setup for Vue SFC compilation
- You maintain compatibility across the supporting libraries

## Project Setup

```sh
pnpm install
pnpm dev             # inside the package
pnpm demo-integrated # from repo root
```

## OData Integration

### Type Generation

```typescript
notSapODataVitePlugin({
  services: {
    NORTHWIND_V2: {
      alias: 'NorthwindModel',
      path: '/V2/Northwind/Northwind.svc',
    },
  },
})
```

Generated types live in `.odata.types.ts`:

```typescript
import { NorthwindModel, type TNorthwindModelOData } from '@/.odata.types'

const model = NorthwindModel.getInstance()
const entitySet = await model.entitySet('Products')
```

### Proxy Configuration

During development, requests are proxied through [odata-proxy.ts](odata-proxy.ts) to reach the public service.

