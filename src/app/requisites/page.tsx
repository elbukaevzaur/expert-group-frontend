import styles from '@/app/requisites/requisites.module.css'

export default function Requisites() {
    return (
        <div className={styles.requisites}>
            <h1 className={styles.title}>Наши реквизиты</h1>
            <h3 className={styles.subtitile}>Индивидуальный предприниматель</h3>
            <h3 className={styles.subtitile}>Маляр Юлия Витальевна</h3>
            <h3 className={styles.subtitile}>ИНН 230501741607</h3>
            <h3 className={styles.subtitile}>Свидетельство серии 23 № 007681233</h3>
            <h3 className={styles.subtitile}>ОГРН 310230528400033</h3>
            <h3 className={styles.subtitile}>Юридический адрес: 353290, Краснодарский край, г. Горячий Ключ, ул. Бабушкина, д. 29А</h3>
        </div>
    )
}