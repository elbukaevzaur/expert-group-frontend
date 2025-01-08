import styles from '@/app/projects/[projectsCategoriesId]/details/details.module.css'
import Image from 'next/image'

export default function ProjectDetails() {
    return (
        <div className={styles.details}>
            <h2 className={styles.title}>Дизайн интерьера в оттенках бургунди в Краснодарском крае</h2>
            <div className={styles.description}>
                <Image className={styles.description_image} src={'/images/Project_details.png'} alt='image' width={720} height={479}/>
                <div className={styles.description_container}>
                    <p className={styles.description_paragraph}>Дизайнер Елена Тундас создала лаконичный интерьер с акцентам в красных тонах, который отражает гостеприимность хозяев.</p>
                    <p className={styles.description_paragraph}>«Заказчики проекта, супружеская пара с уже взрослыми детьми, которые давно мечтали о собственном доме. Хозяева не знали точно, каким именно они представляют свой будущий интерьер, но они определенно не хотели излишней роскоши. Предложенный нами элегантный и лаконичный проект, пришелся по душе нашим героям, буквально, с первого референса», — рассказывает дизайнер Елена Тундас.</p>
                    <div className={styles.description_wrapper}>
                        <button className={`${styles.description_button} ${styles.description_button_green}`}>Заказать проект</button>
                        <button className={styles.description_button}>Написать сообщение</button>
                    </div>
                </div>
            </div>
            <div className={styles.paragraph}>
                <p className={`${styles.paragraph_text} ${styles.paragraph_text_margin}`}>«Планировку дома сильно менять не пришлось — она вполне устраивала заказчиков. Cупруги только попросили отгородить кухню-гостиную от приватной зоны с тремя спальнями, что мы сделали с помощью стеклянной перегородки с дверью в черном металле».</p>
                <p className={styles.paragraph_text}>Хозяйка любит принимать гостей и устраивать домашние вечеринки с музыкой и танцами. Чтобы подчеркнуть жизнерадостную и гостеприимную атмосферу дома, было решено привнести в интерьер яркие акценты в оттенках бургунди. «Так в гостиной появилась акцентная стена фактурой природного камня, собравшая всю красную палитру. С ней перекликается цвет фасадов кухни, расположившейся за деревянной перегородкой. Таким образом нам удалось сохранить целостность пространства».</p>
                <p className={styles.paragraph_text}>Третья спальня получилась брутальной. Можно легко догадаться, что ее хозяин — молодой мужчина. «Старший сын редко приезжает к родителям, поэтому комната чаще служит гостевой. Здесь нам нужно было организовать хранение большого количества спортивных наград. Мы решили сделать черную фактурную стену, переходящую в полки с подсветкой, на которых и расположились трофеи».</p>
                <p className={`${styles.paragraph_text} ${styles.paragraph_text_margin}`}>«В ванной комнате успешно получилось вписать постирочную зону, которая спрятана в шкафу. За дверцами шкафа удалось разместить стиральную и сушильную машину, корзину для белья, полки для хранения принадлежностей».</p>
                <p className={styles.paragraph_text}>Авторы проекта: дизайнер Елена Тундас, т. +7 (918) 279-38-17, elena_tundas</p>
                <p className={styles.paragraph_text}>Фото Алексей Шмуль</p>
                <p className={styles.paragraph_text}>Стиль Мария Шапошникова</p>
            </div>
            <div className={styles.photo}>
                <h3 className={styles.photo_title}>Фотогалерея</h3>
                <div className={styles.photo_wrapper}>
                <Image className={styles.photo_image} src={'/images/Detalis_image.png'} alt="Фото" width={1089} height={524}/>
                <button className={styles.photo_button_left}>
                    <Image src={'/images/Vector_left_img.png'} alt="Влево" width={25} height={41}/>
                </button>
                <button className={styles.photo_button_right}>
                <Image src={'/images/Vector_right_img.png'} alt="Влево" width={25} height={41}/>
                </button>
                <div className={styles.swipe}>
                    <div className={styles.swipe_circle}></div>
                    <div className={styles.swipe_circle}></div>
                    <div className={styles.swipe_circle}></div>
                    <div className={`${styles.swipe_circle} ${styles.swipe_circle_active}`}></div>
                    <div className={styles.swipe_circle}></div>
                    <div className={styles.swipe_circle}></div>
                </div>
                </div>
            </div>
        </div>
    )
}