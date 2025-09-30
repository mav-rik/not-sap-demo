<script setup lang="ts">
defineProps<{ small?: boolean }>()
</script>

<template>
    <div class="logo-wrapper">
        <div class="logo-glow" :class="{ 'logo-glow--small': small }">
            <div class="logo-glow__inner"></div>
            <div class="logo-glow__outer"></div>
        </div>
        <img
            src="https://raw.githubusercontent.com/mav-rik/not-sap/main/docs/notsap.png"
            alt="NotSap Logo"
            class="logo-image"
            :class="{ 'logo-image--small': small }"
        />
    </div>
    <h1 class="logo-title" :class="{ 'logo-title--small': small }">
        NOTSAPUI
    </h1>
</template>

<style scoped>
.logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.logo-glow {
  position: absolute;
  inset: 0;
  width: 150px;
  height: 150px;
  left: 50%;
  top: 50%;
  transform: translate(-58%, -50%);
  pointer-events: none;
}

.logo-glow--small {
  width: 80px;
  height: 80px;
}

.logo-glow__inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.6;
  background: radial-gradient(circle, #0070f2 0%, #3083e31c 40%, transparent 80%);
  filter: blur(40px);
}

.logo-glow__outer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.4;
  background: radial-gradient(circle, #00b8f0 0%, transparent 60%);
  filter: blur(30px);
}

.logo-image {
  width: 100px;
  height: auto;
  position: relative;
  z-index: 10;
}

.logo-image--small {
  width: 50px;
}

.logo-title {
  text-align: center;
  font-family: serif;
  letter-spacing: 0.2em;
  color: rgb(1, 169, 237);
  cursor: default;
  font-size: 2.617rem;
  margin: 0;
}

.logo-title--small {
  font-size: 1.25rem;
  letter-spacing: 0.15em;
}
</style>