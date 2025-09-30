<script setup lang="ts">
</script>

<template>
  <h3 class="app-card-header">
    <slot></slot>
  </h3>
</template>

<style scoped>
.app-card-header {
  margin: 0 0 1rem 0;
  padding: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--text-secondary, #6b7280);
}

@media (prefers-color-scheme: dark) {
  .app-card-header {
    --text-secondary: #9ca3af;
  }
}
</style>