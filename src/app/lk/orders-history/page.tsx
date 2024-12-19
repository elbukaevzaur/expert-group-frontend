import Image from "next/image";

export default function Page() {
  return (
    <div className="history">
      <div className="history__item">
        <Image
          className="history__item_img"
          src={"/images/image.png"}
          alt="Изображение"
          width={166}
          height={95}
        />
        <div className="history__item_content">
          <div className="history__item_wrapper">
            <h3 className="history__item_text">Гладкий отливной карниз Кт-68, 56Hx34мм</h3>
            <h3 className="history__item_text history__item_width">Статус:{" "}<span className="history__item_span">Собирается на складе</span></h3>
          </div>
          <div className="history__item_wrapper">
            <h3 className="history__item_text history__item_width">№ Заказа: 20512</h3>
            <h3 className="history__item_text history__item_width">Итого: 1030 ₽</h3>
          </div>
        </div>
        <div className="history__item_wrapper">
          <button className="history__item_button">Посмотреть детали</button>
          </div>
      </div>
    </div>
  );
}
