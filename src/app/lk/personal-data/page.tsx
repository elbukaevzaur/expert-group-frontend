import styles from "@/app/lk/personal-data/personal-data.module.css"
export default function Page() {
    return (
        <div className={styles.personal_data}>
            <div className={styles.personal_data__content}>
                <h2 className={styles.personal_data__info}>Имя</h2>
                <input className={styles.personal_data__input} type="text" placeholder="Иван" />
            </div>
            <div className={styles.personal_data__content}>
                <h2 className={styles.personal_data__info}>Отчество</h2>
                <input className={styles.personal_data__input} type="text" placeholder="Иванович" />
            </div>
            <div className={styles.personal_data__content}>
                <h2 className={styles.personal_data__info}>Фамилия</h2>
                <input className={styles.personal_data__input} type="text" placeholder="Иванов" />
            </div>
            <div className={styles.personal_data__content}>
                <h2 className={styles.personal_data__info}>Имя</h2>
                <input className={styles.personal_data__input} type="email" placeholder="ivanov@mail.ru" />
            </div>
        </div>
    )
}