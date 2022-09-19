import {
  useState,
  Dispatch,
  SetStateAction,
  Fragment,
  ChangeEvent,
} from 'react'
import moment from 'moment'
import {
  BsCalendarWeek as DateIcon,
  BsCardChecklist as TodoIcon,
} from 'react-icons/bs'
import { MdOutlineDelete as DeleteIcon } from 'react-icons/md'
import { RiArchiveDrawerLine as ArchiveIcon } from 'react-icons/ri'
import { AiOutlineEdit as EditIcon } from 'react-icons/ai'
import { TodosTypes, TodoTypes } from 'types/todo.types'
import Modal from './ui/Modal'
import styles from './Todo.module.scss'
import addTodoStyles from './AddTodo.module.scss'

type PropsTypes = {
  todo: TodoTypes
  setTodos: Dispatch<SetStateAction<TodosTypes>>
}

const Todo = ({ todo, setTodos }: PropsTypes) => {
  const [confirm, setConfirm] = useState<{
    visibility: boolean
    action: 'remove' | 'archive' | ''
  }>({ visibility: false, action: '' })

  const [todoVisibility, setTodoVisibility] = useState(false)
  const [newTodoValue, setNewTodoValue] = useState(
    todo.limit ? { ...todo, limit: todo.limit?.slice(0, 10) } : todo,
  )
  const [edit, setEdit] = useState(false)
  const [removeArchivedTodo, setRemoveArchivedTodo] = useState(false)

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

  const updateTodo = async (body: unknown) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        const todos = await response.json()
        setTodos(todos.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewTodoValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <Fragment>
      <div className={todo.isArchived ? styles.archived : styles.todo}>
        <div
          className={styles.checkboxWrapper}
          onClick={() => updateTodo({ isArchived: !todo.isArchived })}
        >
          <span
            className={todo.isArchived ? styles.checked : styles.checkbox}
          />
        </div>
        <div
          className={styles.todoContent}
          onClick={() =>
            todo.isArchived && setRemoveArchivedTodo(!removeArchivedTodo)
          }
        >
          <div onClick={() => setTodoVisibility(!todoVisibility)}>
            <h2>{todo.title}</h2>
            <p>{todo.body}</p>
            {todo.limit && (
              <div
                className={[
                  styles.date,
                  taskToDoToday && styles.urgentTask,
                ].join(' ')}
              >
                <DateIcon />
                {moment(todo.limit).format('LL')}
              </div>
            )}
          </div>
          {confirm.visibility && (
            <div className={styles.buttonsWrapper}>
              <p>
                Are you sure to <strong>{confirm.action} </strong>this task ?
              </p>
              <button
                onClick={() => setConfirm({ visibility: false, action: '' })}
              >
                Cancel
              </button>
              <button
                className={styles.filledButton}
                onClick={() =>
                  confirm.action === 'remove'
                    ? removeTodo()
                    : updateTodo({ isArchived: !todo.isArchived })
                }
              >
                Confirm
              </button>
            </div>
          )}
        </div>
        {!todo.isArchived && (
          <div className={styles.removeIcons}>
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => setConfirm({ visibility: true, action: 'remove' })}
            />
            <ArchiveIcon
              onClick={() =>
                setConfirm({ visibility: true, action: 'archive' })
              }
            />
          </div>
        )}
      </div>
      {todo.isArchived && (
        <div className={styles.deleteArchivedTodo}>
          <DeleteIcon className={styles.deleteIcon} />
        </div>
      )}
      {!todo.isArchived && (
        <Modal
          title="Todo viewer"
          icon={<TodoIcon />}
          visibility={{
            modalVisibility: todoVisibility,
            setModalVisibility: setTodoVisibility,
          }}
        >
          <Fragment>
            <div className={styles.editWrapper}>
              <button
                className={styles.editButton}
                onClick={() => setEdit(true)}
              >
                <EditIcon />
                Edit the todo
              </button>
            </div>
            <div
              className={
                edit ? styles.inputDisabledWrapper : styles.inputWrapper
              }
            >
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={newTodoValue.title}
                onChange={handleChange}
                disabled={!edit}
                autoFocus={edit}
              />
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                id="body"
                value={newTodoValue.body}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>
            {edit ? (
              <input
                type="date"
                name="limit"
                className={[addTodoStyles.datePicker, styles.datePicker].join(
                  ' ',
                )}
                value={newTodoValue.limit}
                onChange={handleChange}
              />
            ) : (
              <div
                className={[
                  styles.date,
                  taskToDoToday && styles.urgentTask,
                ].join(' ')}
              >
                <DateIcon />
                {moment(todo.limit).format('LL')}
              </div>
            )}
            {edit && (
              <div className={styles.confirmationButtonsWrapper}>
                <button onClick={() => setEdit(false)}>Cancel</button>
                <button
                  onClick={() => {
                    updateTodo(newTodoValue)
                    setEdit(false)
                  }}
                  className={styles.filledButton}
                >
                  Update the todo
                </button>
              </div>
            )}
          </Fragment>
        </Modal>
      )}
      {
        <Modal
          title="Confirmation"
          visibility={{
            modalVisibility: removeArchivedTodo,
            setModalVisibility: setRemoveArchivedTodo,
          }}
          type="confirmation"
          confirmAction={removeTodo}
        >
          <h2 className={styles.confirmationTitle}>
            Are you sure to delete this todo ?
          </h2>
        </Modal>
      }
    </Fragment>
  )
}

export default Todo
