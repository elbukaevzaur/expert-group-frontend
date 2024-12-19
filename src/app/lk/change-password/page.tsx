
export default function Page() {
    return (
        <div className="personal-data">
            <div className="personal-data__content">
                <h2 className="personal-data__info password">Пароль</h2>
                <input className="personal-data__input" type="text" placeholder="Старый пароль" />
            </div>
            <div className="personal-data__content">
                <h2 className="personal-data__info password">Новый пароль</h2>
                <input className="personal-data__input" type="text" placeholder="Новый пароль" />
            </div>
            <div className="personal-data__content">
                <h2 className="personal-data__info password">Повторить пароль</h2>
                <input className="personal-data__input" type="text" placeholder="Новый пароль" />
            </div>
        </div>
    )
}