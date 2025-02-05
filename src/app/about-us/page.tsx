import styles from "@/app/about-us/about-us.module.css"
import Image from "next/image"

export default function AboutUs() {
    return (
        <div className={styles.content}>
            <h1 className={styles.title}>О нас</h1>
            <div className={styles.container}>
                <Image className={styles.image} src={'/images/AboutUS1.png'} alt="Image" width={672} height={477}/>
                <div className={styles.wrapper}>
                    <p className={styles.text}><span className={styles.span}>EXPERT GROUP</span> – воплощение мастерства и надежности в мире архитектуры, дизайна и строительства.Уже более 8 лет компания успешно создает уникальные решения для частных и коммерческих объектов, объединяя все этапы работ – от проектирования до полной реализации под ключ.</p>
                    <p className={styles.text}>Стабильность и внимание к деталям позволяют <span className={styles.span}>EXPERT GROUP</span> удовлетворять потребности клиентов даже в условиях высокого спроса, предлагая как готовые решения, так и индивидуальные проекты. Сотни успешных объектов – от уютных домов до масштабных коммерческих пространств – подтверждают безупречное качество и надежность.
                    Ваши идеи – наше вдохновение, ваш комфорт – наша цель.</p>
                    <p className={`${styles.text} ${styles.span}`}>EXPERT GROUP. Создаем пространство, достойное вашей мечты.</p>
                </div>
            </div>
            <div className={styles.photo}>
                <Image className={styles.photo_image} src={'/images/AboutUS2.png'} alt="Image" width={368} height={309}/>
                <Image className={styles.photo_image} src={'/images/AboutUS3.png'} alt="Image" width={368} height={309}/>
                <Image className={styles.photo_image} src={'/images/AboutUS4.png'} alt="Image" width={368} height={309}/>
            </div>
            <div className={styles.paragraph}>
                <h3 className={styles.paragraph_text}>Сегодня <span className={styles.span}>EXPERT GROUP</span> – это мощная команда профессионалов, собственные производственные возможности и широкая сеть надежных партнеров.</h3>
                <h4 className={styles.paragraph_text}>Компания предлагает полный спектр услуг:</h4>
                <ul>
                    <li className={`${styles.paragraph_list} ${styles.paragraph_text}`}>– Архитектурное проектирование и дизайн интерьеров,</li>
                    <li className={`${styles.paragraph_list} ${styles.paragraph_text}`}>– Ландшафтный дизайн и ремонт под ключ,</li>
                    <li className={`${styles.paragraph_list} ${styles.paragraph_text}`}>– Производство гипсовой лепнины, дверей, мебели,</li>
                    <li className={`${styles.paragraph_list} ${styles.paragraph_text}`}>– Освещение, сантехника, напольные покрытия и лакокрасочные материалы.</li>
                </ul>
            </div>            
        </div>
    )
}