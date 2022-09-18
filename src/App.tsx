import TodosWrapper from 'components/TodosWrapper'
import styles from './App.module.scss'
import 'scss/index.scss'

const App = () => {
  return (
    <div className={styles.wrapper}>
      <TodosWrapper />
    </div>
  )
}

export default App
