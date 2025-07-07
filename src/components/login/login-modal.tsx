import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {SIGN_IN_REQUEST, UPDATE_FOR_API} from "@/lib/reducers";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./login-modal.module.css"
import {SmartCaptcha} from "@yandex/smart-captcha";

export function Login({onCloseModal = () => {}}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {isAuth, isAuthError } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [token, setToken] = useState("")

    useEffect(() => {
        if (isAuth){
            dispatch(UPDATE_FOR_API())
            onCloseModal();
        }
    }, [isAuth]);

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const request = {
            login: login,
            password: password,
            captchaToken: token
        }
        dispatch(SIGN_IN_REQUEST(request))
    }

    const handleNavigationToReg = () => {
        router.push('/registration');
        onCloseModal();
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onCloseModal();
        }
    };

    return (
        <div className={styles.login} onClick={handleOverlayClick}>
            <div className={styles.container}>
                <button className={styles.close} onClick={onCloseModal}></button>
                <Image src={"/images/Logo.png"} alt="Логотип" width={251} height={52}/>
                <form onSubmit={handleSignIn} className={styles.form}>
                    <div className={styles.content}>
                        <h3 className={styles.input_text}>Логин</h3>
                        <input id="name" value={login} onChange={(e) => setLogin(e.target.value)} className={`${styles.input} ${isAuthError && styles.auth_error}`} type="text"/>
                    </div>
                    <div className={`${styles.content} ${styles.content_margin}`}>
                        <h3 className={styles.input_text}>Пароль</h3>
                        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${styles.input} ${isAuthError && styles.auth_error}`} type="password"/>
                    </div>
                    <div className={styles.wrapper}>
                        <button className={styles.password}>Забыли пароль?</button>
                    </div>
                    <div className={styles.wrapper}>
                        <SmartCaptcha sitekey="ysc1_PGtt7h20TVEO6e6al1oLezIe8Al8Z0FpJ8fJCY5F7edb713f" onSuccess={setToken} />
                    </div>
                    <button className={styles.button}>Войти</button>
                </form>
                <div className={`${styles.wrapper} ${styles.line_margin}`}>
                    <div className={`${styles.line} ${styles.line_left}`}></div>
                    <h3 className={styles.line_text}>или</h3>
                    <div className={`${styles.line} ${styles.line_right}`}></div>
                </div>
                <div className={styles.social}>
                    <Image src={'/images/Yandex_logo.png'} alt="Яндекс" width={57} height={57}/>
                    <Image src={'/images/Mail_logo.png'} alt="Яндекс" width={57} height={57}/>
                    <Image src={'/images/VK_logo_login.png'} alt="Яндекс" width={57} height={57}/>
                </div>
                <h3 className={styles.registration}>
                    Нет аккаунта? <button onClick={handleNavigationToReg} style={{all: 'unset'}}>
                        <span className={styles.registration_span}>Зарегистрироваться</span>
                    </button>
                </h3>
            </div>
        </div>
    )
}