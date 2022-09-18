import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'
import { TodosTypes } from 'types/todo.types'
import Todo from './Todo'
import SpinningLoader from '../components/ui/SpinningLoader'
import styles from './Todos.module.scss'
import { Fragment } from 'react'

type PropsTypes = {
  todos: TodosTypes
  isLoading: boolean
  error: string | null
}

const Todos = ({ todos, isLoading, error }: PropsTypes) => {
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

  return (
    <Fragment>
      {todos.map(todo => (
        <div key={todo._id} className={styles.wrapper}>
          <Todo todo={todo} />
        </div>
      ))}
    </Fragment>
  )
}

export default Todos
