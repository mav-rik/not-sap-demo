<script setup lang="ts">
defineProps<{ small?: boolean }>()
</script>

<template>
    <div class="relative flex items-center justify-center cursor-default">
        <div class="absolute inset-0 -translate-x-58% -translate-y-1/2 left-1/2 top-1/2 pointer-events-none"
          :class="{
            'size-[150px]': !small,
            'size-[80px]': small,
          }"
        >

            <div class="absolute inset-0 rounded-full opacity-60" style="background: radial-gradient(circle, #0070f2 0%, #3083e31c 40%, transparent 80%); filter: blur(40px);"></div>
            <div class="absolute inset-0 rounded-full opacity-40" style="background: radial-gradient(circle, #00b8f0 0%, transparent 60%); filter: blur(30px);"></div>
        </div>
    <img
        src="https://raw.githubusercontent.com/mav-rik/not-sap/main/notsap.png"
        alt="NotSap Logo"
        class="h-auto relative z-10"
        :class="{
            'w-[100px]': !small,
            'w-[50px]': small,
        }"
    />
    </div>
    <h1 class="text-center font-serif tracking-2 text-[rgb(1,169,237)]  cursor-default"
        :class="{
            'text-h3 tracking-2': !small,
            'text-h5 tracking-1.5': small,
        }"
    >NOTSAPUI</h1>
</template>