<template>
  <ul class="flex gap-8">
    <li
      v-for="filter in filters"
      :key="filter.name"
      @click="handleFilterButtton(filter.name)"
      class=" cursor-pointer transition-colors rounded-full text-gray-400 bg-slate-200 dark:bg-slate-400 dark:text-slate-700 px-3 py-1"
      :class="{ 'text-gray-500 bg-slate-300 dark:!bg-slate-500 dark:!text-slate-800': todosStore.filterBase === filter.name }"
    >
      {{ filter.text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useTodosStore } from "@/stores/todosStore"

const filters = [
  { name: "all", text: "All" },
  { name: "done", text: "Done" },
  { name: "undone", text: "Undone" },
]

const todosStore = useTodosStore()

const handleFilterButtton = (filterBase: string) => {
  // change the todos list based on the filter selected
  todosStore.filterBase = filterBase
}
</script>

<style scoped></style>
