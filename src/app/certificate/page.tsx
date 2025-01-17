import styles from '@/app/certificate/certificate.module.css'
import Image from 'next/image'
import { IncreaseSvg } from '@/lib/icon-svg'

export default function Certificate() {
    return(
        <div className={styles.certificate}>
            <h1 className={styles.title}>Сертификаты</h1>
            <div className={styles.items}>
                <div className={styles.item}>
                    <div className={styles.item_image}>
                    <Image src={'/images/Certificate1.png'} alt='Image' width={246} height={178}/>
                    <button className={styles.item_button}>{<IncreaseSvg/>}</button>
                    </div>
                    <h3 className={styles.item_title}>Сертификат официального дилера Orac Decor</h3>
                    <p className={styles.item_subtitle}>Настоящий сертификат удостоверяет, что Expert Group является официальным дилером лепного декора Orac Decor (Бельгия) на территории города Грозный</p>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_image}>
                    <Image src={'/images/Certificate2.png'} alt='Image' width={246} height={178}/>
                    <button className={styles.item_button}>{<IncreaseSvg/>}</button>
                    </div>
                    <p className={styles.item_subtitle}>Сертификат официального дилера производителя каменного шпона Slate Lite (Германия)</p>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_image}>
                    <Image src={'/images/Certificate3.png'} alt='Image' width={246} height={178}/>
                    <button className={styles.item_button}>{<IncreaseSvg/>}</button>
                    </div>
                    <p className={styles.item_subtitle}>Данный сертификат удостоверяет, что Джем Decor является официальным дилером торговой марки Ultrawood</p>
                </div>
            </div>
        </div>
    )
}