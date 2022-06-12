
import styles from './CloseButton.module.scss'

export const CloseButton = ({ onClick }) => {
    return (
        <button className={styles['close']} onClick={onClick}>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
    );
}