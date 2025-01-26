import styles from '@/app/vacancy/vacancy.module.css'
import { ShareSvg } from '@/lib/icon-svg'
import Link from 'next/link'

export default function Vacancy() {
    return (
        <div className={styles.vacancy}>
            <h1 className={styles.title}>Вакансия</h1>
            <div className={styles.items}>
                <div className={styles.item}>
                    <h3 className={styles.item_title}>Менеджер по продажам в г.Грозный</h3>
                    <p className={styles.item_info}>Ищем менеджера по продажам! Мы предлагаем конкурентоспособную заработную плату, дружелюбную рабочую атмосферу и возможности для профессионального развития. Если вы готовы к новым вызовам и хотите стать частью нашей команды, мы будем рады видеть вас!</p>
                    <h4 className={styles.item_number}>Для связи <a href={`tel:${+79389032666}`} className={styles.item_phone}>+7 (938) 903-26-66</a></h4>
                    <div className={styles.item_container}>
                        <Link href={'/vacancy/job'}>
                        <button className={styles.item_button}>Смотреть вакансию</button>
                        </Link>
                        <button className={`${styles.item_button} ${styles.item_button_small}`}>Поделиться {<ShareSvg/>}</button>
                    </div>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.item_title}>Кладовщик на склад в г.Грозный</h3>
                    <p className={styles.item_info}>Мы ищем ответственного и внимательного кладовщика для работы на нашем складе по продаже декоративных товаров, таких как карнизы, плинтуса и другие элементы интерьера.Если вы готовы к новым вызовам и хотите стать частью нашей команды, мы будем рады видеть вас!</p>
                    <h4 className={styles.item_number}>Для связи <a href={`tel:${+79389032666}`} className={styles.item_phone}>+7 (938) 903-26-66</a></h4>
                    <div className={styles.item_container}>
                        <button className={styles.item_button}>Смотреть вакансию</button>
                        <button className={`${styles.item_button} ${styles.item_button_small}`}>Поделиться {<ShareSvg/>}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}