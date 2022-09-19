import { useState, Dispatch, SetStateAction } from 'react'
import { BsCalendarWeek as DateIcon } from 'react-icons/bs'
import { TodosTypes } from 'types/todo.types'
import styles from './AddTodo.module.scss'

type PropsTypes = {
  setTodos: Dispatch<SetStateAction<TodosTypes>>
}

const AddTodo = ({ setTodos }: PropsTypes) => {
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

  return (
    <div>
      <button
        className={styles.addButton}
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
            placeholder="Task name here..."
            className={styles.titleInput}
            value={newTodo.title}
            onChange={event =>
              setNewTodo(prevState => ({
                ...prevState,
                title: event.target.value,
              }))
            }
          />
          <input
            type="text"
            id="body"
            placeholder="Description"
            className={styles.bodyInput}
            value={newTodo.body}
            onChange={event =>
              setNewTodo(prevState => ({
                ...prevState,
                body: event.target.value,
              }))
            }
          />
          <div className={styles.buttonWrapper}>
            <div className={styles.left}>
              <button>
                <DateIcon />
                Due Date
              </button>
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