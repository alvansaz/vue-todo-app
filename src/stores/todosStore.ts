import { computed, ref } from "vue"
import { defineStore } from "pinia"
import type { todo, todoWithoutId } from "@/types/todo"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore"
import db from "@/firestore"

export const useTodosStore = defineStore("todos", () => {
  // -----------------------------------------------------
  const todos = ref<todo[]>([])
  const filterBase = ref<string>("all")
  const darkMode = ref<boolean>(false)
  // -----------------------------------------------------
  const filteredTodos = computed(() => {
    if (filterBase.value === "all") return todos.value
    if (filterBase.value === "done")
      return todos.value.filter((todo) => todo.isDone === true)
    if (filterBase.value === "undone")
      return todos.value.filter((todo) => todo.isDone === false)
  })
  // -----------------------------------------------------
  const getAllTodos = () => {
    try {
      onSnapshot(collection(db, "todosCollection"), (querySnapshot) => {
        const tempTodos: todo[] = []
        querySnapshot.forEach((doc) => {
          const todo: todo = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            isDone: doc.data().isDone,
          }
          tempTodos.push(todo)
        })
        todos.value = tempTodos
      })
    } catch (e) {
      console.error(e)
    } finally {
    }
  }
  // -----------------------------------------------------
  const changeStatus = async (id: string) => {
    const todoRef = doc(db, "todosCollection", id)
    const todo = await getDoc(todoRef)
    const todoIsDone = todo.data()?.isDone

    await updateDoc(todoRef, {
      isDone: !todoIsDone,
    })
  }
  // -----------------------------------------------------
  const removeTodo = async (id: string) => {
    await deleteDoc(doc(db, "todosCollection", id))
  }
  // -----------------------------------------------------
  const addTodo = async (newTodo: todoWithoutId) => {
    await addDoc(collection(db, "todosCollection"), newTodo)
  }
  // -----------------------------------------------------
  const getSingleTodo = async (id: string) => {
    const todoRef = doc(db, "todosCollection", id)
    const todo = await getDoc(todoRef)
    return todo.data()
  }
  // -----------------------------------------------------
  const editTodo = async (id: string, title: string, description: string) => {
    const todoRef = doc(db, "todosCollection", id)

    console.log(title, description)

    await updateDoc(todoRef, {
      title: title,
      description: description,
    })
  }
  // -----------------------------------------------------
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }
  // -----------------------------------------------------
  return {
    todos,
    filterBase,
    darkMode,
    filteredTodos,
    getAllTodos,
    changeStatus,
    removeTodo,
    addTodo,
    getSingleTodo,
    editTodo,
    toggleDarkMode
  }
})
