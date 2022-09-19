import { ReactNode, Dispatch, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { RiCloseCircleLine } from 'react-icons/ri'
import styles from './Modal.module.scss'

type PropsTypes = {
  title: string
  icon?: JSX.Element
  children: ReactNode
  visibility: {
    modalVisibility: boolean
    setModalVisibility: Dispatch<SetStateAction<boolean>> | (() => void)
    callback?: () => void
  }
  customClass?: string
  type?: 'confirmation'
  confirmAction?: () => void
}

/**
 * @param title - Req. title displayed in the modal header
 * @param icon - Opt. JSX Element, displayed next to the title
 * @param children - Req. modal content
 * @param visibility - Req. an objet containing usually the two parts of an useState (boolean and setter)
 * @param customClass - Opt. a custom class for custom style
 * @param type - Opt. can be set to 'confirmation' to display two buttons (cancel & Confirm) and enable confirmAction use
 * @param confirmAction - Opt. a function triggered by clicking on the 'Confirm' button when a modal is in 'confirmation' type
 */

const Modal = ({
  title,
  children,
  visibility: { modalVisibility, setModalVisibility, callback },
  icon,
  customClass,
  type,
  confirmAction,
}: PropsTypes): JSX.Element | null => {
  const closeModal = () => {
    setModalVisibility(false)
    callback?.()
  }

  if (!modalVisibility) return null

  const modal = (
    <div
      className={[
        styles.modalWrapper,
        type === 'confirmation' && styles.confirmationModal,
        customClass,
      ].join(' ')}
    >
      <div className={styles.modalInner}>
        <div className={styles.header}>
          <div>
            {icon} {title}
          </div>
          <RiCloseCircleLine size="2.3rem" onClick={closeModal} />
        </div>
        <div className={styles.content}>
          {children}
          {type === 'confirmation' && (
            <div className={styles.buttonWrapper}>
              <button onClick={() => setModalVisibility(false)}>Cancel</button>
              <button onClick={confirmAction}>Confirm</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
export default Modal
