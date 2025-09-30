<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotSapApp from 'notsapui/NotSapApp.vue'
</script>

<template>
  <NotSapApp namespace="com.mavrik.demo.northwind">
    <RouterView />
  </NotSapApp>
</template>
