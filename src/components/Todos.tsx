import { Fragment, Dispatch, SetStateAction } from 'react'
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'
import { TodosTypes } from 'types/todo.types'
import Todo from './Todo'
import SpinningLoader from '../components/ui/SpinningLoader'
import styles from './Todos.module.scss'

type PropsTypes = {
  todos: TodosTypes
  setTodos: Dispatch<SetStateAction<TodosTypes>>
  isLoading: boolean
  error: string | null
  section?: 'todo' | 'archived'
}

const Todos = ({
  todos,
  setTodos,
  isLoading,
  error,
  section = 'todo',
}: PropsTypes) => {
  if (isLoading)
    return (
      <div>
        <SpinningLoader />
      </div>
    )

  if (error)
    return (
      <div className={styles.errorWrapper}>
        <ErrorIcon />
        <p>{error}</p>
      </div>
    )

  if (!todos.length)
    return (
      <div className={styles.noData}>
        {section === 'todo'
          ? "You don't have any tasks in progress, click below to create one"
          : 'You have no archived tasks'}
      </div>
    )

  return (
    <Fragment>
      {todos
        // if isArchived return 1 else return 0
        .sort((a, b) => Number(a.isArchived) - Number(b.isArchived))
        .map(todo => (
          <div key={todo._id} className={styles.wrapper}>
            <Todo todo={todo} setTodos={setTodos} />
          </div>
        ))}
    </Fragment>
  )
}

export default Todos
