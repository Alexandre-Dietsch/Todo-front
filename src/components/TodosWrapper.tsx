import { useState, useEffect } from 'react'
import { TodosTypes } from 'types/todo.types'
import AddTodo from './AddTodo'
import Todos from './Todos'
import Notifications from './Notifications'
import styles from './TodosWrapper.module.scss'

const TodosWrapper = () => {
  const [tabs, setTabs] = useState(2)
  const [todos, setTodos] = useState<TodosTypes>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch('http://localhost:3001/todos')
        if (response.ok) {
          const todos = await response.json()
          setTodos(todos.data)
          setIsLoading(false)
        }
      } catch {
        setIsLoading(false)
        setError('Error while retrieving the todos')
      }
    }

    getTodos()
  }, [])

  return (
    <div className={styles.todosWrapper}>
      <ul className={styles.tabs}>
        <li
          onClick={() => setTabs(1)}
          className={tabs === 1 ? styles.tabSelected : ''}
        >
          Notifications
        </li>
        <li
          onClick={() => setTabs(2)}
          className={tabs === 2 ? styles.tabSelected : ''}
        >
          Todos
          <span className={styles.totalTab}>
            {todos.filter(todo => !todo.isArchived).length}
          </span>
        </li>
        <li
          onClick={() => setTabs(3)}
          className={tabs === 3 ? styles.tabSelected : ''}
        >
          Archived
          <span className={styles.totalTab}>
            {todos.filter(todo => todo.isArchived).length}
          </span>
        </li>
      </ul>
      {tabs === 1 && (
        <div className={styles.notifications}>
          <Notifications />
        </div>
      )}
      {tabs === 2 && (
        <div className={styles.todosTab}>
          <Todos
            todos={todos}
            setTodos={setTodos}
            isLoading={isLoading}
            error={error}
          />
        </div>
      )}
      {tabs === 3 && (
        <div className={styles.archived}>
          <Todos
            todos={todos.filter(todo => todo.isArchived)}
            setTodos={setTodos}
            isLoading={isLoading}
            error={error}
            section="archived"
          />
        </div>
      )}
      <div className={styles.addTodoWrapper}>
        <AddTodo todos={todos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default TodosWrapper
