<template>
  <nav class="text-center flex justify-center">
    <div class="w-1/6 flex justify-start items-center">
      <span
        class="material-symbols-rounded rounded-full p-1 dark:text-slate-200 hover:dark:text-slate-500 hover:bg-gray-200 cursor-pointer transition-all"
        @click="toggleDarkMode"
        >{{ todosStore.darkMode ? "light_mode" : "dark_mode" }}</span
      >
    </div>
    <router-link
      class="mx-7 font-bold text-gray-400 dark:text-gray-400 transition-color flex items-center"
      v-for="route in routes"
      :key="route.name"
      :to="{ name: route.name }"
      >{{ route.text }}</router-link
    >
    <div class="w-1/6"></div>
  </nav>
  <!-- <button class="bg-blue-400" @click="toggleDarkMode">Click</button> -->
</template>

<script setup lang="ts">
import { useTodosStore } from "@/stores/todosStore"

const routes = [
  { name: "home", text: "Home" },
  { name: "add", text: "Create a todo" },
]

const todosStore = useTodosStore()

const toggleDarkMode = () => {
  todosStore.toggleDarkMode()
  document.querySelector("body")?.classList.toggle("dark")
}
</script>

<style>
nav .router-link-active.router-link-exact-active {
  color: #000;
}
.dark nav .router-link-active.router-link-exact-active {
  color: #fff;
}
</style>
