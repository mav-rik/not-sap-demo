<script setup lang="ts">
defineProps<{
  icon?: string
  loading?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    class="app-button"
    :disabled="disabled || loading"
    :class="{ 'app-button--loading': loading }"
  >
    <span v-if="icon" :class="icon" class="app-button__icon"></span>
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3em;
  font-size: 16px;
  padding: 0;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--primary-color, #0070f2);
  color: white;
}

.app-button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.app-button:active:not(:disabled) {
  transform: translateY(0);
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.app-button--loading {
  pointer-events: none;
}

.app-button__icon {
  font-size: 1.25rem;
  display: inline-block;
  width: 24px;
  height: 24px;
  padding: 0;
  color: rgb(var(--current-icon));
}
</style>