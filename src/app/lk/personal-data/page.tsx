
export default function Page() {
    return (
        <div className="personal-data">
            <div className="personal-data__content">
                <h2 className="personal-data__info">Имя</h2>
                <input className="personal-data__input" type="text" placeholder="Иван" />
            </div>
            <div className="personal-data__content">
                <h2 className="personal-data__info">Отчество</h2>
                <input className="personal-data__input" type="text" placeholder="Иванович" />
            </div>
            <div className="personal-data__content">
                <h2 className="personal-data__info">Фамилия</h2>
                <input className="personal-data__input" type="text" placeholder="Иванов" />
            </div>
            <div className="personal-data__content">
                <h2 className="personal-data__info">Имя</h2>
                <input className="personal-data__input" type="email" placeholder="ivanov@mail.ru" />
            </div>
        </div>
    )
}