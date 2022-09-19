import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { TodosTypes } from 'types/todo.types'
import styles from './AddTodo.module.scss'

type PropsTypes = {
  todos: TodosTypes
  setTodos: Dispatch<SetStateAction<TodosTypes>>
}

const AddTodo = ({ todos, setTodos }: PropsTypes) => {
  const [displayAddInput, setDisplayAddInput] = useState(false)
  const initialTodo = { title: '', body: '' }
  const [newTodo, setNewTodo] = useState(initialTodo)

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })
      if (response.ok) {
        const todos = await response.json()
        setTodos(todos.data)
      }
    } catch (error) {
      console.log(error)
    }

    setDisplayAddInput(false)
    setNewTodo(initialTodo)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewTodo(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))

  return (
    <div>
      <button
        className={[styles.addButton, !todos.length && styles.pulse].join(' ')}
        onClick={() => setDisplayAddInput(true)}
        disabled={displayAddInput}
      >
        +
      </button>
      {displayAddInput && (
        <div className={styles.addInputWrapper}>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Task name here..."
            className={styles.titleInput}
            value={newTodo.title}
            onChange={handleChange}
          />
          <input
            type="text"
            id="body"
            name="body"
            placeholder="Description"
            className={styles.bodyInput}
            value={newTodo.body}
            onChange={handleChange}
          />
          <div className={styles.buttonWrapper}>
            <div className={styles.left}>
              <input
                type="date"
                name="limit"
                className={styles.datePicker}
                onChange={handleChange}
              />
            </div>
            <div className={styles.right}>
              <button
                onClick={() => {
                  setDisplayAddInput(false)
                  setNewTodo(initialTodo)
                }}
              >
                Cancel
              </button>
              <button className={styles.filledButton} onClick={() => addTask()}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTodo
