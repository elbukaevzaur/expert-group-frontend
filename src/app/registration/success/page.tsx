import React from "react";
import styles from "@/app/registration/success/success.module.css"; // Стили для страницы

export default function SuccessPage() {
    return (
        <div className={styles.successContainer}>
            <h1 className={styles.title}>Вы успешно зарегистрировались!</h1>
            <p className={styles.message}>
                Мы отправили вам письмо с подтверждением на ваш электронный адрес.
                Пожалуйста, откройте его и подтвердите свой почтовый адрес, чтобы завершить регистрацию.
            </p>
            <p className={styles.message}>
                Если вы не получили письмо, пожалуйста, проверьте папку "Спам" или повторите попытку позже.
            </p>
        </div>
    );
}
