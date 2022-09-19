import { useNavigate } from 'react-router-dom'
import errorImg from 'assets/images/error.svg'
import styles from './ErrorPage.module.scss'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.errorPageWrapper}>
      <div className={styles.imageWrapper}>
        <img src={errorImg} alt="error page" />
      </div>
      <h1>It looks like we have a problem, please try again later.</h1>
      <button onClick={() => navigate('/')}>Back to todo list</button>
    </div>
  )
}

export default ErrorPage
