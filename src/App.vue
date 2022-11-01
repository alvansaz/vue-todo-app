<template>
  <header class="p-8 mb-10">
    <TheNavbar />
  </header>

  <RouterView v-slot="{ Component }">
    <Transition name="route" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import TheNavbar from "./components/TheNavbar.vue"
</script>

<style>
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}
</style>
