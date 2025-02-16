import styles from '@/app/requisites/requisites.module.css'

export default function Requisites() {
    return (
        <div className={styles.requisites}>
            <h1 className={styles.title}>Наши реквизиты</h1>
            <h3 className={styles.subtitile}>Наименование: ООО "ЭКСПЕРТ-ГРУПП"</h3>
            <h3 className={styles.subtitile}>ИНН: 2013011469</h3>
            <h3 className={styles.subtitile}>ОГРН: 1232000004191</h3>
            <h3 className={styles.subtitile}>Юридический адрес: 364024, Россия, г. Грозный, Назарбаева 79</h3>
        </div>
    )
}