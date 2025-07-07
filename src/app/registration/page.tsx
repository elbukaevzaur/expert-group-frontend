"use client"

import styles from "@/app/registration/registration.module.css";
import { registerRequest } from "@/lib/http/authRequest";
import { RegisterRequest } from "@/lib/models/login";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {useRouter} from "next/navigation";
import {SmartCaptcha} from "@yandex/smart-captcha";

interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    consent: boolean;
}

export default function Registration() {
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<IFormInput>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [token, setToken] = useState('');


    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        setIsSubmitting(true);
        const request: RegisterRequest = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            captchaToken: token
        };

        try {
            registerRequest(request).then((resp) => {
                router.push("/registration/success")
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.registration}>
            <h2 className={styles.registration__title}>Регистрация</h2>
            <div className={`${styles.registration__info} ${styles.registration__input_margin}`}>
                <div className={styles.registration__input_wrap}>
                    <input
                        className={styles.registration__input}
                        type="text"
                        id="firstName"
                        placeholder="Имя"
                        {...register("firstName", {required: "Имя обязательно"})}
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                </div>
                <div className={styles.registration__input_wrap}>
                    <input
                        className={styles.registration__input}
                        type="text"
                        id="lastName"
                        placeholder="Фамилия"
                        {...register("lastName", {required: "Фамилия обязательна"})}
                    />
                    {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
                </div>
            </div>
            <div className={styles.registration__info}>
                <div className={styles.registration__input_wrap}>
                    <input
                        className={styles.registration__input}
                        type="email"
                        id="email"
                        placeholder="Электронный адрес"
                        {...register("email", {
                            required: "Электронный адрес обязателен",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Введите корректный email",
                            },
                        })}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>
                <div className={styles.registration__input_wrap}>
                    <input
                        className={styles.registration__input}
                        type="tel"
                        id="phoneNumber"
                        placeholder="Телефон"
                        {...register("phoneNumber", {
                            required: "Номер телефона обязателен",
                            pattern: {
                                value: /^[+]?[0-9]{10,15}$/,
                                message: "Введите корректный номер телефона",
                            },
                        })}
                    />
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber.message}</span>}
                </div>
            </div>
            <div className={styles.registration__wrapper}>
                <div className={styles.registration__input_wrap}>
                    <div>
                        <input
                            id="registration__checkbox"
                            className={styles.registration__checkbox}
                            type="checkbox"
                            {...register("consent", {
                                required: "Вы должны согласиться на обработку данных"
                            })}
                        />
                        <label htmlFor="registration__checkbox">
                            Я даю согласие на обработку персональных данных
                        </label>
                    </div>
                    <div style={{marginTop: 5}}>
                        {errors.consent && <span className={styles.error}>{errors.consent.message}</span>}
                    </div>
                </div>
            </div>
            <div className={styles.registration__info}>
                <div className={styles.registration__input_wrap}>
                    <input
                        className={styles.registration__input}
                        type="password"
                        id="password"
                        placeholder="Придумайте пароль"
                        {...register("password", {
                            required: "Пароль обязателен",
                            minLength: {value: 6, message: "Пароль должен содержать не менее 6 символов"},
                            pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "Только латинские буквы"
                            },
                        })}
                    />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>
                <div className={styles.registration__input_wrap}>
                    <input
                        className={styles.registration__input}
                        type="password"
                        id="confirmPassword"
                        placeholder="Повторите пароль"
                        {...register("confirmPassword", {
                            required: "Подтверждение пароля обязательно",
                            validate: (value) => {
                                const password = watch("password");
                                return password === value || "Пароли не совпадают";
                            },
                        })}
                    />
                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                </div>
            </div>
            <div className={styles.registration__wrapper}>
                <div className={styles.registration__input_wrap}>
                    <SmartCaptcha sitekey="ysc1_PGtt7h20TVEO6e6al1oLezIe8Al8Z0FpJ8fJCY5F7edb713f" onSuccess={setToken} />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <button type="submit" className={styles.registration__button} disabled={isSubmitting}>
                    {isSubmitting ? 'Загружается...' : 'Зарегистрироваться'}
                </button>
            </div>
        </form>
    );
}
