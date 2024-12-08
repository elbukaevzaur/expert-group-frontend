
export default function Registration() {
    return (
        <div className="registration">
            <h2 className="registration__title">Регистрация </h2>
            <div className="registration__info registration__input_margin">
                <input className="registration__input" type="text" placeholder="Имя"/>
                <input className="registration__input" type="text" placeholder="Фамилия"/>
            </div>
            <div className="registration__info">
                <input className="registration__input" type="text" placeholder="E-mail"/>
                <input className="registration__input" type="text" placeholder="Телефон"/>
            </div>
                <input type="checkbox" />
            <div className="registration__info">
                <input className="registration__input" type="text" placeholder="Придумайте пароль"/>
                <input className="registration__input" type="text" placeholder="Повторите пароль"/>
            </div>

        </div>
    )
}