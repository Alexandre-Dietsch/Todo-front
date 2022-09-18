export type TodoTypes = {
  _id: string
  title: string
  body?: string
  limit?: string
  createdAt: string
  updatedAt?: string
  isArchived: boolean
}

export type TodosTypes = TodoTypes[]
