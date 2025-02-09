"use client"

import {useSearchParams} from "next/navigation";
import styles from './confirm-email.module.css';
import {useAppSelector} from "@/lib/hooks";
import {confirmRequest} from "@/lib/http/authRequest";
import {useState} from "react";

export default function ConfirmEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isConfirmedError, setIsConfirmedError] = useState(false);

    function handleConfirmEmail() {
        confirmRequest(String(token)).then((resp) => {
            setIsConfirmed(true);
        }).catch((e) => {
            setIsConfirmedError(true)
        })
    }

    return <div className={styles.content}>
            <h1 className={styles.title}>Подтверждение адреса электронной почты</h1>
            <div className={styles.container}>
                {
                    isConfirmed ?
                        <button className={styles.button_confirm_success}>Адрес электронной почты успешно подтвержден</button>
                        :
                        <button className={styles.button} onClick={handleConfirmEmail}>Подтвердить</button>
                }
                {
                    isConfirmedError &&
                    <h4>Ошибка подтверждения электронной почты</h4>
                }
            </div>
    </div>
}