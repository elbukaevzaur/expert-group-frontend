import Image from "next/image";
import Link from "next/link";
import {useAppDispatch} from "@/lib/hooks";
import {SIGN_IN_REQUEST, SIGN_OUT} from "@/lib/reducers";

export function Login() {
    const dispatch = useAppDispatch();

    const handleSignIn = () => {
        const request = {
            login: 'test',
            password: 'test'
        }
        dispatch(SIGN_IN_REQUEST(request))
    }

    function handleSignOut() {
        dispatch(SIGN_OUT())
    }

    return (
        <div className="login">
            <div className="login__conteiner">
                <Image src={"/images/Logo.png"} alt="Логотип" width={251} height={52}/>
                <form action={handleSignIn} className="login__form">
                    <div className="login__content">
                        <h3 className="login__input_text">Логин</h3>
                        <input className="login__input" type="text"/>
                    </div>
                    <div className="login__content login__content_margin">
                        <h3 className="login__input_text">Пароль</h3>
                        <input className="login__input" type="password"/>
                    </div>
                    <div className="login__wrapper">
                        <button className="login__password">Забыли пароль?</button>
                    </div>
                    <button className="login__button">Войти</button>
                </form>
                <button onClick={handleSignOut} className="login__button">Выйти</button>
                <div className="login__wrapper login__line_margin">
                    <div className="login__line login__line_left"></div>
                    <h3 className="login__line_text">или</h3>
                    <div className="login__line login__line_right"></div>
                </div>
                <div className="login__social">
                    <Image src={'/images/Yandex_logo.png'} alt="Яндекс" width={57} height={57}/>
                    <Image src={'/images/Mail_logo.png'} alt="Яндекс" width={57} height={57}/>
                    <Image src={'/images/VK_logo_login.png'} alt="Яндекс" width={57} height={57}/>
                </div>
                <h3 className="login__registration">Нет аккаунта? <Link href='/registration'><span
                    className="login__registration_span">Зарегистрироваться</span></Link></h3>
            </div>
        </div>
    )
}