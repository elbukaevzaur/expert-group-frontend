import styles from "@/components/preview-basket-modal.module.css"
import Image from "next/image"
import {MinusSmall, PlusSmall, CloseSvg, CloseSmall} from "@/lib/icon-svg";
import Link from "next/link";
import React from 'react';

export default function PreviewBasketModal() {
    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Корзина</h1>
            <button className={styles.close}>{<CloseSvg/>}</button>
            <div className={styles.item}>
                <div className={styles.image}>
                <Image src={"/images/image.png"} alt="image" width={158} height={105}/>
                </div>
                <div className={styles.wrapper}>
                <div className={styles.name}>
                    <h2 className={styles.text}>Гладкий отливной карниз Кт-68, 56Hx34мм</h2>
                    <button className={styles.delete}>{<CloseSmall/>}</button>
                </div>
                <div className={styles.name}>
                    <div className={styles.name}>
                        <div className={styles.quantity_button}>{<MinusSmall />}</div>
                        <h3 className={styles.quantity}>1</h3>
                        <div className={styles.quantity_button}>{<PlusSmall/>}</div>
                    </div>
                    <h3 className={styles.summ}>1030 &#8381;</h3>
                </div>
                </div>
            </div>
            <div className={styles.total}>
                <h3 className={styles.total_text}>Итого <span className={styles.total_span}>3090 &#8381;</span></h3>
                <button className={styles.clear}>Очистить {<CloseSmall stroke={'#7B7B7B'}/>}</button>
            </div>
            <div className={styles.total}>
            <Link href='/basket'>
                <div className={`${styles.button} ${styles.button_white}`}>В КОРЗИНУ</div>
            </Link>
                <div className={styles.button}>БЫСТРЫЙ ЗАКАЗ</div>
            </div>
        </div>
    )
}