import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodosWrapper from 'components/TodosWrapper'
import ErrorPage from 'components/ErrorPage'
import styles from './App.module.scss'
import 'scss/index.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <div className={styles.wrapper}>
              <TodosWrapper />
            </div>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
