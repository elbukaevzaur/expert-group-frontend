import Image from "next/image"
import styles from './slider.module.css'
import { MenuSvg } from "@/lib/icon-svg"
import PaginationComponent from "../pagination/pagination"

interface SlideProps {

}

export default function SliderComponent() {
    return(
         <div className={styles.slider}>
           <Image 
                className={styles.slider__image} 
                width={1920}
                height={800}
                src={'/images/slider.png'}
                alt=''
            />
            <div className={styles.slider__wrapper}>
                <h2 className={styles.slider__title}>Воплощение мастерства и надежности в мире архитектуры, дизайна и строительства</h2>
                <button className={styles.slider__button}> <MenuSvg stroke="#fff" width={24} height={24} /> Открыть каталог</button>
            </div>
            <PaginationComponent totalSteps={5} currentStep={2}/>
        </div>
    )
}