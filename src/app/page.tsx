import styles from '@/app/page.module.css';
import { ArrowLeftSvg } from '@/lib/icon-svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home__wrapper}>
        <h2 className={styles.home__title}>Популярные категории</h2>
        <Link href={"/catalog"} className={styles.home__title_link}>
          <p className={styles.home__title_subtitle}>Весь каталог</p>
          <ArrowLeftSvg className={styles.home_svg} fill={'#21A038'} width={9} height={16}/>
        </Link>
      </div>
      

      <h2 className={styles.home__title}>Популярные товары</h2>


      <h2 className={styles.home__title}>Партнеры</h2>
        <div className={styles.home__partners}>
          <Image src={'/images/Home1.png'} alt='Docke' width={282} height={90}/>
          <Image src={'/images/Home2.png'} alt='Grasaro' width={282} height={90}/>
          <Image src={'/images/Home3.png'} alt='Grand Line' width={282} height={90}/>
          <Image src={'/images/Home4.png'} alt='Brayer' width={282} height={90}/>
          <Image src={'/images/Home5.png'} alt='Ariston' width={282} height={90}/>
          <Image src={'/images/Home6.png'} alt='Denzel' width={282} height={90}/>
          <Image src={'/images/Home7.png'} alt='Welte Home' width={282} height={90}/>
          <Image src={'/images/Home8.png'} alt='Arya home' width={282} height={90}/>
        </div>
    </div>
  );
}
