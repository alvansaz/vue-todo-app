interface todo {
  id: string
  title: string
  description: string
  isDone: boolean
}

interface todoWithoutId {
  title: string
  description: string
  isDone: boolean
}

export type {todo, todoWithoutId}

// export default todo
// export default todoWithoutId