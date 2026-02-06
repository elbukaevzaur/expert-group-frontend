import Image from "next/image";
import styles from "./slider.module.css";
import { MenuSvg } from "@/lib/icon-svg";
import PaginationComponent from "../pagination/pagination";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SlideProps {
  image: string;
  title: string;
}

interface SliderComponentProps {
  slides: SlideProps[];
}

export default function SliderComponent({ slides }: SliderComponentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(goToNextSlide, 3000); 
    return () => clearInterval(interval);
  }, [goToNextSlide, slides.length]);

  if (!slides || slides.length === 0) return null;

  const { image, title } = slides[currentSlide];

  const slideVariants = {
    initial: { x: '100%' },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%' },
  };

  return (
    <div className={styles.slider} >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 1 }}
          className={styles.slide_container}
        >
          <Image
            className={styles.slider__image}
            width={1920}
            height={800}
            src={image}
            alt={title}
            priority
          />
        </motion.div>
          <div className={styles.slider__wrapper}>
            <h2 className={styles.slider__title}>{title}</h2>
            <Link href="/catalog" className={styles.slider__button}>
              <MenuSvg stroke="#fff" width={24} height={24} className={styles.slider__button_icon} /> Открыть каталог
            </Link>
          </div>
      </AnimatePresence>
        
      <PaginationComponent
        totalSteps={slides.length}
        currentStep={currentSlide}
      />
    </div>
  );
}
