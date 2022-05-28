import styles from './Button.module.scss';

export const ButtonPrimary = ({ children, className, onClick, ...props }) => {
    return (
        <button
        className={`${className} ${styles.btn} ${styles.btn__secondary}`}
        onClick={onClick}
        {...props}
        >
        {children}
        </button>
    );
}

export const ButtonSecondary = ({ children, className, onClick, ...props }) => {
    return (
        <button
        className={`${className} ${styles.btn} ${styles.btn__secondary}`}
        onClick={onClick}
        {...props}
        >
        <img className={styles.btn__image} src="/logo_btn.svg" alt="" />
        {children}
        </button>
    );
}