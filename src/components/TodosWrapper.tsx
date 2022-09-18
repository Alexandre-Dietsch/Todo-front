import { useState, useEffect } from 'react'
import { TodosTypes } from 'types/todo.types'
import Todos from './Todos'
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
          Todo
          <span className={styles.totalTab}>{todos.length}</span>
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
      {tabs === 1 && <div className={styles.notifications}>Notifications</div>}
      {tabs === 2 && (
        <div className={styles.todosTab}>
          <Todos todos={todos} isLoading={isLoading} error={error} />
        </div>
      )}
      {tabs === 3 && <div className={styles.archived}>Archived</div>}
      <div className={styles.newTodoWrapper}></div>
    </div>
  )
}

export default TodosWrapper
