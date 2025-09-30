<script setup lang="ts">
defineProps<{
  items: Array<{ value: string; label: string }>
  loading?: boolean
}>()

const value = defineModel<string>()
</script>

<template>
  <div class="app-select-wrapper">
    <select
      v-model="value"
      class="app-select"
      :disabled="loading"
    >
      <option v-if="loading" value="">Loading...</option>
      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.app-select-wrapper {
  position: relative;
  width: 100%;
}

.app-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #87878725;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: var(--scope-light-0, white);
  color: var(--scope-dark-0, #1f2937);
  cursor: pointer;
  transition: all 0.2s ease;
}

.app-select:hover:not(:disabled) {
  border-color: var(--primary-color, #0070f2);
}

.app-select:focus {
  outline: none;
  border-color: var(--primary-color, #0070f2);
  box-shadow: 0 0 0 3px rgba(0, 112, 242, 0.1);
}

.app-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (prefers-color-scheme: dark) {
  .app-select {
    background-color: var(--scope-dark-0, white);
    color: var(--scope-light-0, #1f2937);
  }
}
</style>