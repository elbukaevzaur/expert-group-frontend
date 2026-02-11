import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {SIGN_IN_REQUEST, UPDATE_FOR_API} from "@/lib/reducers";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./login-modal.module.css"
import {SmartCaptcha} from "@yandex/smart-captcha";
import { Eye, EyeOff } from "lucide-react";
import { CloseSvg } from "@/lib/icon-svg";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerRequest } from "@/lib/http/authRequest";
import { RegisterRequest } from "@/lib/models/login";

interface LoginProps {
    onCloseModal?: () => void;
}

interface IFormInput {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    consent?: boolean;
    login?: string; // For login mode
}

export const Login: React.FC<LoginProps> = ({onCloseModal = () => {}}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const {isAuth, isAuthError } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [token, setToken] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IFormInput>();

    useEffect(() => {
        if (isAuth){
            dispatch(UPDATE_FOR_API())
            onCloseModal();
        }
    }, [isAuth, dispatch, onCloseModal]);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (isLogin) {
        const request = {
                login: data.login || "",
                password: data.password || "",
            captchaToken: token
        }
        dispatch(SIGN_IN_REQUEST(request))
        } else {
            setIsSubmitting(true);
            const names = (data.fullName || "").trim().split(/\s+/);
            const lastName = names[0] || "";
            const firstName = names.slice(1).join(" ") || "";

            const request: RegisterRequest = {
                firstName: firstName || lastName,
                lastName: firstName ? lastName : "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || "",
                password: data.password || "",
                captchaToken: token
            };

            registerRequest(request).then((resp) => {
                router.push("/registration/success");
        onCloseModal();
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                setIsSubmitting(false);
            });
        }
    }

    const toggleMode = (loginMode: boolean) => {
        setIsLogin(loginMode);
        reset();
    };

    return (
        <div className={styles.login}>
            <motion.div
                className={styles.modal__overlay}
                onClick={onCloseModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <motion.div
                className={styles.container}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
                <div className={styles.header}>
                    <button className={styles.close} onClick={onCloseModal}>
                        <CloseSvg />
                    </button>
                    
                    <div className={styles.header_text_container}>
                        <h2 className={styles.title}>
                            {isLogin ? "Войдите в аккаунт" : "Создайте аккаунт"}
                        </h2>
                        <p className={styles.subtitle}>
                            {isLogin 
                                ? "Если у вас еще нет аккаунта, перейдите на вкладку Регистрация и зарегистрируйтесь в один клик" 
                                : "Для этого укажите только электронную почту, мы отправим на нее данные для входа"
                            }
                        </p>
                    </div>
                </div>

                <div className={styles.toggle_container}>
                    <div className={`${styles.toggle_slider} ${isLogin ? styles.toggle_slider_right : styles.toggle_slider_left}`} />
                    <div 
                        className={`${styles.toggle_item} ${!isLogin ? styles.toggle_item_active : ""}`}
                        onClick={() => toggleMode(false)}
                    >
                        Регистрация
                    </div>
                    <div 
                        className={`${styles.toggle_item} ${isLogin ? styles.toggle_item_active : ""}`}
                        onClick={() => toggleMode(true)}
                    >
                        Вход
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login-fields"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                    <div className={styles.content}>
                        <h3 className={styles.input_text}>Логин</h3>
                        <input 
                                        {...register("login", { required: "Логин обязателен" })}
                                        className={`${styles.input} ${(isAuthError || errors.login) && styles.auth_error}`} 
                            type="text"
                            placeholder="Введите ваш логин"
                        />
                                    {errors.login && <span className={styles.error}>{errors.login.message}</span>}
                    </div>
                    <div className={`${styles.content} ${styles.content_margin}`}>
                        <h3 className={styles.input_text}>Пароль</h3>
                        <div className={styles.password_wrapper}>
                            <input 
                                            {...register("password", { required: "Пароль обязателен" })}
                                            className={`${styles.input} ${styles.password_input} ${(isAuthError || errors.password) && styles.auth_error}`} 
                                type={showPassword ? "text" : "password"}
                                placeholder="Введите ваш пароль"
                            />
                            <button 
                                type="button"
                                className={styles.password_toggle}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </div>
                    <div className={styles.wrapper}>
                                    <button type="button" className={styles.password}>Забыли пароль?</button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="reg-fields"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={styles.content}>
                                    <h3 className={styles.input_text}>Ф.И.О</h3>
                                    <input 
                                        {...register("fullName", { required: "Ф.И.О обязательно" })}
                                        className={`${styles.input} ${errors.fullName && styles.auth_error}`} 
                                        type="text"
                                        placeholder="Введите ваше Ф.И.О"
                                    />
                                    {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
                                </div>
                                
                                <div className={`${styles.content} ${styles.content_margin}`}>
                                    <h3 className={styles.input_text}>Электронный адрес</h3>
                                    <input 
                                        {...register("email", { 
                                            required: "Email обязателен",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Введите корректный email",
                                            }
                                        })}
                                        className={`${styles.input} ${errors.email && styles.auth_error}`} 
                                        type="email"
                                        placeholder="Электронный адрес"
                                    />
                                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                                </div>

                                <div className={`${styles.content} ${styles.content_margin}`}>
                                    <h3 className={styles.input_text}>Телефон</h3>
                                    <input 
                                        {...register("phoneNumber", { 
                                            required: "Телефон обязателен",
                                            pattern: {
                                                value: /^[+]?[0-9]{10,15}$/,
                                                message: "Введите корректный номер телефона",
                                            }
                                        })}
                                        className={`${styles.input} ${errors.phoneNumber && styles.auth_error}`} 
                                        type="tel"
                                        placeholder="Телефон"
                                    />
                                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber.message}</span>}
                                </div>

                                <div className={`${styles.content} ${styles.content_margin}`}>
                                    <h3 className={styles.input_text}>Пароль</h3>
                                    <div className={styles.password_wrapper}>
                                        <input 
                                            {...register("password", { 
                                                required: "Пароль обязателен",
                                                minLength: { value: 6, message: "Минимум 6 символов" }
                                            })}
                                            className={`${styles.input} ${styles.password_input} ${errors.password && styles.auth_error}`} 
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Придумайте пароль"
                                        />
                                        <button 
                                            type="button"
                                            className={styles.password_toggle}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                                </div>

                                <div className={`${styles.content} ${styles.content_margin}`}>
                                    <h3 className={styles.input_text}>Повторите пароль</h3>
                                    <input 
                                        {...register("confirmPassword", { 
                                            required: "Подтвердите пароль",
                                            validate: (value) => value === watch('password') || "Пароли не совпадают"
                                        })}
                                        className={`${styles.input} ${errors.confirmPassword && styles.auth_error}`} 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Повторите пароль"
                                    />
                                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                                </div>

                                <div className={styles.checkbox_wrapper}>
                                    <input 
                                        {...register("consent", { required: true })}
                                        className={styles.checkbox}
                                        type="checkbox"
                                        id="consent"
                                    />
                                    <label htmlFor="consent" className={styles.checkbox_label}>
                                        Я даю согласие на обработку персональных данных
                                    </label>
                    </div>
                                {errors.consent && <span className={styles.error}>Необходимо согласие</span>}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={`${styles.wrapper} ${styles.content_margin}`}>
                        <SmartCaptcha sitekey="ysc1_PGtt7h20TVEO6e6al1oLezIe8Al8Z0FpJ8fJCY5F7edb713f" onSuccess={setToken} />
                    </div>
                    
                    <button className={styles.button} disabled={isSubmitting}>
                        {isLogin ? "Войти" : (isSubmitting ? "Загружается..." : "Зарегистрироваться")}
                    </button>
                </form>

                <div className={`${styles.wrapper} ${styles.line_margin}`}>
                    <div className={`${styles.line} ${styles.line_left}`}></div>
                    <h3 className={styles.line_text}>или</h3>
                    <div className={`${styles.line} ${styles.line_right}`}></div>
                </div>
                <div className={styles.social}>
                    <Image src={'/images/Yandex_logo.png'} alt="Яндекс" width={57} height={57}/>
                    <Image src={'/images/Mail_logo.png'} alt="Mail.ru" width={57} height={57}/>
                    <Image src={'/images/VK_logo_login.png'} alt="VK" width={57} height={57}/>
                </div>
            </motion.div>
        </div>
    );
};
