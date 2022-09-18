import { useState } from 'react'
import styles from './TodosWrapper.module.scss'

const TodosWrapper = () => {
  const [tabs, setTabs] = useState(1)

  return (
    <div className={styles.todosWrapper}>
      <ul className={styles.tabs}>
        <li
          onClick={() => setTabs(1)}
          className={tabs === 1 ? styles.tabSelected : ''}
        >
          Notifications
          <span className={styles.totalTab}>0</span>
        </li>
        <li
          onClick={() => setTabs(2)}
          className={tabs === 2 ? styles.tabSelected : ''}
        >
          Todo
          <span className={styles.totalTab}>3</span>
        </li>
        <li
          onClick={() => setTabs(3)}
          className={tabs === 3 ? styles.tabSelected : ''}
        >
          Archived
          <span className={styles.totalTab}>100</span>
        </li>
      </ul>
      {tabs === 1 && <div className={styles.notifications}>Notifications</div>}
      {tabs === 2 && <div className={styles.todos}>Todos</div>}
      {tabs === 3 && <div className={styles.archived}>Archived</div>}
      <div className={styles.newTodoWrapper}></div>
    </div>
  )
}

export default TodosWrapper
