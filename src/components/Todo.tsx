import moment from 'moment'
import { BsCalendarWeek as DateIcon } from 'react-icons/bs'
import { TodoTypes } from 'types/todo.types'
import styles from './Todo.module.scss'

type PropsTypes = {
  todo: TodoTypes
}

const Todo = ({ todo }: PropsTypes) => {
  const taskToDoToday =
    moment(todo.limit).format('LL') === moment(new Date()).format('LL')

  return (
    <div className={styles.todo}>
      <div className={styles.checkbox}>
        <input type="checkbox" />
      </div>
      <div className={styles.todoContent}>
        <h2>{todo.title}</h2>
        <p>{todo.body}</p>
        {todo.limit && (
          <div
            className={[styles.date, taskToDoToday && styles.urgentTask].join(
              ' ',
            )}
          >
            <DateIcon />
            {moment(todo.limit).format('LL')}
          </div>
        )}
      </div>
    </div>
  )
}

export default Todo
