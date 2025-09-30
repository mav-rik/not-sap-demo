<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NotSapApp } from 'notsapui'
</script>

<template>
  <NotSapApp namespace="com.mavrik.demo.northwind">
    <RouterView />
  </NotSapApp>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
  --primary: #428fb9;
}
body * {
  box-sizing: border-box;
}
.layer-0 {
  --current-bg: var(--scope-light-0);
  --current-text: var(--scope-dark-0);
  --current-icon: var(--scope-dark-0);
  --un-bg-opacity: 1;
  background-color: rgb(var(--current-bg));
  --un-text-opacity: 1;
  color: rgb(var(--current-text) / var(--un-text-opacity));
}
.dark .layer-0 {
  --current-bg: var(--scope-dark-0);
  --current-text: var(--scope-light-0);
  --current-icon: var(--scope-light-0);
}

.layer-1 {
  --current-bg: var(--scope-light-1);
  --current-text: var(--scope-dark-1);
  --current-icon: var(--scope-dark-1);
  --un-bg-opacity: 1;
  background-color: rgb(var(--current-bg));
  --un-text-opacity: 1;
  color: rgb(var(--current-text) / var(--un-text-opacity));
}
.dark .layer-1 {
  --current-bg: var(--scope-dark-1);
  --current-text: var(--scope-light-1);
  --current-icon: var(--scope-light-1);
}

.layer-2 {
  --current-bg: var(--scope-light-2);
  --current-text: var(--scope-dark-2);
  --current-icon: var(--scope-dark-2);
  --current-border: 131 134 144;
  --un-bg-opacity: 1;
  background-color: rgb(var(--current-bg));
  --un-text-opacity: 1;
  color: rgb(var(--current-text) / var(--un-text-opacity));
}
.dark .layer-2 {
  --current-bg: var(--scope-dark-2);
  --current-text: var(--scope-light-2);
  --current-icon: var(--scope-light-2);
}

.layer-3 {
  --current-bg: var(--scope-light-3);
  --current-text: var(--scope-dark-3);
  --current-icon: var(--scope-dark-3);
  --un-bg-opacity: 1;
  background-color: rgb(var(--current-bg));
  --un-text-opacity: 1;
  color: rgb(var(--current-text) / var(--un-text-opacity));
}
.dark .layer-3 {
  --current-bg: var(--scope-dark-3);
  --current-text: var(--scope-light-3);
  --current-icon: var(--scope-light-3);
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

button {
  padding: 0;
  background-color: transparent;
  border: none;
  margin: 0;
}

table {
  border-collapse: collapse;
}

/* Common dialog styles */
.record-dialog {
  border-radius: 0.75rem;
  min-width: 500px;
}

.dialog-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}
</style>
