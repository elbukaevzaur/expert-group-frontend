import styles from "@/app/lk/change-password/change-password.module.css"
export default function Page() {
    return (
        <div className={styles.personal_data}>
            <div className={styles.personal_data__content}>
                <h2 className={`${styles.personal_data__info} ${styles.password}`}>Пароль</h2>
                <input className={styles.personal_data__input} type="text" placeholder="Старый пароль" />
            </div>
            <div className={styles.personal_data__content}>
                <h2 className={`${styles.personal_data__info} ${styles.password}`}>Новый пароль</h2>
                <input className={styles.personal_data__input} type="text" placeholder="Новый пароль" />
            </div>
            <div className={styles.personal_data__content}>
                <h2 className={`${styles.personal_data__info} ${styles.password}`}>Повторить пароль</h2>
                <input className={styles.personal_data__input} type="text" placeholder="Новый пароль" />
            </div>
        </div>
    )
}