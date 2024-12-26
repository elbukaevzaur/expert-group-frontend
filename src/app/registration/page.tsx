import styles from "@/app/registration/registration.module.css"

export default function Registration() {
    return (
        <div className={styles.registration}>
            <h2 className={styles.registration__title}>Регистрация </h2>
            <div className={`${styles.registration__info} ${styles.registration__input_margin}`}>
                <input className={styles.registration__input} type="text" placeholder="Имя"/>
                <input className={styles.registration__input} type="text" placeholder="Фамилия"/>
            </div>
            <div className={styles.registration__info}>
                <input className={styles.registration__input} type="text" placeholder="E-mail"/>
                <input className={styles.registration__input} type="text" placeholder="Телефон"/>
            </div>
            <div className={styles.registration__wrapper}>
            <input id="registration__checkbox" className={styles.registration__checkbox} type="checkbox" />
            <label htmlFor="registration__checkbox">Я даю согласие на обработку персональных данных</label>
            </div>
            <div className={styles.registration__info}>
                <input className={styles.registration__input} type="text" placeholder="Придумайте пароль"/>
                <input className={styles.registration__input} type="text" placeholder="Повторите пароль"/>
            </div>
            <button className={styles.registration__button}>Зарегистрироваться</button>

        </div>
    )
}