import { defineConfig, type Preset } from 'unocss'
import { presetVunor, vunorShortcuts } from 'vunor/theme'
import { notSapUiVunorShortcuts } from 'notsapui/vunor'
import { notSapIconsPreset } from 'notsapui/icons'

export default defineConfig({
  presets: [
    presetVunor({
      baseRadius: '0.25em',
    }) as Preset,
    notSapIconsPreset({
      'light-mode': 'line-md:light-dark-loop',
      'dark-mode': 'line-md:light-dark-loop',
      'details': 'ix:jigsaw-details-filled',
      'minimal': 'streamline-plump:table',
      'advanced': 'si:dashboard-vert-fill',
    }),
],
  shortcuts: [vunorShortcuts(notSapUiVunorShortcuts)],
  // safelist: ['layer-0'],
})
