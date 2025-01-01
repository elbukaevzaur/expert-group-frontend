import styles from "@/app/buy/buy.module.css"
import Image from "next/image"

export default function Buy() {
    return (
        <div className={styles.buy}>
            <div className={styles.title_wrapper}>
                <h1 className={styles.title}>Товары в заказе</h1>
                <p className={styles.subtitle}>/3 шт.</p>
            </div>
            <div className={styles.items}>
                <div className={styles.item}>
                    <div className={styles.item_image}>
                        <Image src={'/images/Image.png'} alt="Image" width={283} height={100}/>
                    </div>
                    <div className={styles.item_wrapper}>
                        <h3 className={styles.item_name}>Гладкий отливной карниз Кт-68, 56Hx34мм</h3>
                        <h3 className={styles.item_name}>2 шт</h3>
                        <h3 className={styles.item_summ}>1030 &#8381;</h3>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_image}>
                        <Image src={'/images/Image.png'} alt="Image" width={283} height={100}/>
                    </div>
                    <div className={styles.item_wrapper}>
                        <h3 className={styles.item_name}>Гладкий отливной карниз Кт-68, 56Hx34мм</h3>
                        <h3 className={styles.item_name}>2 шт</h3>
                        <h3 className={styles.item_summ}>1030 &#8381;</h3>
                    </div>
                </div>
                <div className={styles.total}>
                    <div className={styles.total_wrapper}>
                        <h3 className={styles.total_title}>Итого:</h3>
                        <h3 className={`${styles.total_title} ${styles.total_title_color}`}>3.892 &#8381;/шт</h3>
                    </div>
                    <div className={`${styles.total_wrapper} ${styles.total_wrapper_margin}`}>
                        <h3 className={styles.total_text}>Товаров на:</h3>
                        <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>3.892 &#8381;/шт</h3>
                    </div>
                    <div className={`${styles.total_wrapper} ${styles.total_wrapper_margin}`}>
                        <h3 className={styles.total_text}>Доставка:</h3>
                        <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Бесплатно</h3>
                    </div>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Оплата:</h3>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_wrapper_margin}`}>Банковской картой онлайн</h3>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Доставка:</h3>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_title_color}`}>Самовывоз</h3>
                    <button className={styles.total_button}>Оформить заказ</button>
                </div>
            </div>
            <div className={styles.delivery}>
                <div className={styles.delivery_info}>
                    <h3 className={styles.delivery_title}>Способ доставки</h3>
                    <div className={styles.delivery_wrapper}>
                        <h4 className={styles.delivery_text}>Самовывоз</h4>
                        <h4 className={`${styles.delivery_text} ${styles.delivery_text_grey}`}>м. Ботанический сад</h4>
                    </div>
                    <h4 className={`${styles.delivery_text} ${styles.delivery_text_size}`}>Бесплатно</h4>
                </div>
                <button className={styles.delivery_button}>Изменить</button>
            </div>
        </div>
    )
}