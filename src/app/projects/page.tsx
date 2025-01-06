import styles from "@/app/projects/projects.module.css"
import Image from "next/image"

export default function Projects() {
    return (
        <div className={styles.projects}>
            <h1 className={styles.title}>Проекты</h1>
            <div className={styles.filter}>
                <button className={`${styles.filter_button} ${styles.filter_button_active}`}>ВСЕ ПРОЕКТЫ</button>
                <button className={styles.filter_button}>ДИЗАЙН ИНТЕРЬЕРА</button>
                <button className={styles.filter_button}>ФАСАДНЫЙ ДЕКОР</button>
                <button className={styles.filter_button}>ГОТОВЫЕ РЕШЕНИЯ ПО ФАСАДНОМУ ДЕКОРУ</button>
                <button className={styles.filter_button}>БАЛКИ</button>
                <button className={styles.filter_button}>ЛЕПНИНА ДЛЯ ИНТЕРЬЕРА</button>
                <button className={styles.filter_button}>КАМЕННЫЙ ШПОН</button>
                <button className={styles.filter_button}>3Д ПАНЕЛИ</button>
                <button className={styles.filter_button}>КАМЕННЫЙ ШПОН</button>
                <button className={styles.filter_button}>ФРЕСКИ ФОТООБОИ</button>
            </div>
            <div className={styles.items}>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
            </div>
        </div>
    )
}