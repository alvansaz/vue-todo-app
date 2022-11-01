<template>
  <div class="w-11/12 max-w-xl mx-auto">
    <Transition name="switch" mode="out-in">
      <p
        class="text-4xl leading-snug text-center font-extrabold dark:text-gray-200"
        v-if="todosLength === 0"
      >
        Woohoo! Nothing left todo 🤩
      </p>

      <div v-else>
        <FilterNav class="px-5 mb-5" />
        <Transition name="switch" mode="out-in">
          <div v-if="filteredTodosLength !== 0">
            <TransitionGroup
              tag="div"
              name="list"
              class="relative bg-white dark:bg-black dark:text-gray-100 px-8 py-1 rounded-3xl"
            >
              <SingleTodo
                class="my-5"
                v-for="project in todosStore.filteredTodos"
                :key="project.id"
                :id="project.id"
                :title="project.title"
                :description="project.description"
                :isDone="project.isDone"
              />
            </TransitionGroup>
          </div>

          <p v-else class="mt-10 font-bold text-xl dark:text-gray-200">
            No match 🙄
          </p>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import SingleTodo from "@/components/SingleTodo.vue"
import FilterNav from "@/components/FilterNav.vue"
import { useTodosStore } from "@/stores/todosStore"
import { computed, onMounted, Transition } from "vue"

const todosStore = useTodosStore()

const filteredTodosLength = computed(() => todosStore.filteredTodos?.length)

const todosLength = computed(() => todosStore.todos!.length)

onMounted(() => {
  todosStore.getAllTodos()
})
</script>

<style scoped>
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
}

.switch-enter-to,
.switch-leave-from {
  opacity: 1;
}

.switch-enter-active,
.switch-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.4s ease;
}

.list-leave-active {
  position: absolute;
}
</style>
