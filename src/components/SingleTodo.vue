<template>
  <div
    class="relative cursor-pointer border-l-8 rounded-md py-1 pl-3 transition-colors"
    :style="{ borderLeftColor: isDone ? 'lightgreen' : 'red' }"
    @click="isDescriptionShown = !isDescriptionShown"
  >
    <div class="flex items-center">
      <p>{{ title }}</p>
      <div
        class="flex items-center ml-auto child:rounded-full child:p-1 child:ml-3 child-hover:bg-slate-200 child-hover:dark:bg-slate-500 child:hover:transition-colors"
      >
        <span
          title="Change the status"
          @click.stop="todosStore.changeStatus(props.id!)"
          class="material-symbols-rounded"
        >
          {{ isDone ? "remove_done" : "done_all" }}
        </span>
        <router-link
          class="flex justify-center items-center"
          :to="{ name: 'edit', params: { id: props.id } }"
          @click.stop
        >
          <span class="material-symbols-rounded"> edit </span>
        </router-link>
        <span @click.stop="isModalOpen = true" class="material-symbols-rounded">
          delete
        </span>
      </div>
    </div>
    <p
      class="pr-2 text-sm h-0 overflow-y-hidden transition-all duration-300"
      :class="{ 'pt-4 h-auto': isDescriptionShown }"
    >
      {{ description }}
    </p>
    <TheModal>
      <div
        v-if="isModalOpen"
        @click.self="isModalOpen = false"
        class="modal transition-all fixed bg-gray-900/20 dark:bg-gray-900/50 top-0 left-0 w-full h-full flex justify-center items-center"
      >
        <div
          class="bg-white dark:bg-black text-gray-500 w-2/3 text-center py-5 rounded-2xl"
        >
          <p class="pb-8">Are you sure?</p>
          <div class="flex justify-center">
            <button
              @click.stop="removeTodo"
              class="flex gap-2 justify-center items-center mx-2 py-1 w-24 rounded-sm font-semibold border-2 border-green-400 text-green-400"
            >
              <TheSpinner v-if="isSpinnerShown" dim="5" />
              <span>Yep</span>
            </button>
            <button
              @click.self="isModalOpen = false"
              class="mx-2 py-1 w-24 rounded-sm font-semibold border-2 border-red-400 text-red-400"
            >
              Nope
            </button>
          </div>
        </div>
      </div>
    </TheModal>
  </div>
</template>

<script setup lang="ts">
import { useTodosStore } from "@/stores/todosStore"
import { ref } from "vue"
import TheModal from "./TheModal.vue"
import TheSpinner from "./TheSpinner.vue"

const props = defineProps({
  id: String,
  title: String,
  isDone: Boolean,
  description: String,
})

const isDescriptionShown = ref(false)
const isModalOpen = ref(false)
const isSpinnerShown = ref(false)

const todosStore = useTodosStore()

const removeTodo = async () => {
  isSpinnerShown.value = true
  await todosStore.removeTodo(props.id!)
  isSpinnerShown.value = false
  isModalOpen.value = false
}
</script>
