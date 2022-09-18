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
}

const Todos = ({ todos, setTodos, isLoading, error }: PropsTypes) => {
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
          <Todo todo={todo} setTodos={setTodos} />
        </div>
      ))}
    </Fragment>
  )
}

export default Todos
