import { useState, Dispatch, SetStateAction } from 'react'
import moment from 'moment'
import { BsCalendarWeek as DateIcon } from 'react-icons/bs'
import { MdOutlineDelete as DeleteIcon } from 'react-icons/md'
import { RiArchiveDrawerLine as ArchiveIcon } from 'react-icons/ri'
import { TodosTypes, TodoTypes } from 'types/todo.types'
import styles from './Todo.module.scss'

type PropsTypes = {
  todo: TodoTypes
  setTodos: Dispatch<SetStateAction<TodosTypes>>
}

const Todo = ({ todo, setTodos }: PropsTypes) => {
  const [confirm, setConfirm] = useState<{
    visibility: boolean
    action: 'remove' | 'archive' | ''
  }>({ visibility: false, action: '' })

  const taskToDoToday =
    moment(todo.limit).format('LL') === moment(new Date()).format('LL')

  const removeTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${todo._id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        const todos = await response.json()
        setTodos(todos.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const archiveTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: true }),
      })
      if (response.ok) {
        const todos = await response.json()
        setTodos(todos.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
        {confirm.visibility && (
          <div className={styles.buttonsWrapper}>
            <button
              onClick={() => setConfirm({ visibility: false, action: '' })}
            >
              Cancel
            </button>
            <button
              className={styles.filledButton}
              onClick={() =>
                confirm.action === 'remove' ? removeTodo() : archiveTodo()
              }
            >
              Confirm
            </button>
          </div>
        )}
      </div>
      <div className={styles.removeIcons}>
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => setConfirm({ visibility: true, action: 'remove' })}
        />
        <ArchiveIcon
          onClick={() => setConfirm({ visibility: true, action: 'archive' })}
        />
      </div>
    </div>
  )
}

export default Todo
