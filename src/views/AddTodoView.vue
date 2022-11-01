<template>
  <div
    class="w-10/12 max-w-xl mx-auto bg-white dark:bg-black px-8 py-6 rounded-3xl"
  >
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-3 mb-10">
        <label class="dark:text-gray-200" for="title">Title</label>
        <input
          type="text"
          name="title"
          class="outline-none rounded-md border dark:text-gray-200 border-gray-400 bg-gray-100 dark:bg-gray-600 p-2 focus:border"
          v-model="titleInput"
        />
      </div>
      <div class="flex flex-col items-start gap-3 mb-12">
        <label class="dark:text-gray-200" for="desc">Description</label>
        <textarea
          name="desc"
          rows="4"
          class="w-full outline-none rounded-md border dark:text-gray-200 border-gray-400 bg-gray-100 p-2 dark:bg-gray-600 focus:border"
          v-model="descInput"
        ></textarea>
      </div>
      <button
        type="submit"
        class="flex justify-center items-center gap-2 border-2 border-gray-400 rounded-md px-3 py-1 cursor-pointer dark:text-gray-200 hover:dark:bg-gray-500 hover:bg-gray-200"
      >
        <TheSpinner v-if="isSpinnerShown" color="#000" size="18" />
        <span>Submit</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import TheSpinner from "@/components/TheSpinner.vue"
import router from "@/router"
import { useTodosStore } from "@/stores/todosStore"
import type { todoWithoutId } from "@/types/todo"
import { ref } from "vue"

const titleInput = ref("")
const descInput = ref("")
const isSpinnerShown = ref(false)

const todosStore = useTodosStore()

const redirectToHomepage = () => {
  router.push({ name: "home" })
}

const addNewTodo = async () => {
  const newTodo: todoWithoutId = {
    title: titleInput.value,
    description: descInput.value,
    isDone: false,
  }

  await todosStore.addTodo(newTodo)
}
const handleSubmit = async () => {
  isSpinnerShown.value = true
  await addNewTodo()
  isSpinnerShown.value = false
  redirectToHomepage()
}
</script>
