import Image from "next/image";
import styles from "./slider.module.css";
import { MenuSvg, ArrowLeftSvg } from "@/lib/icon-svg";
import PaginationComponent from "../pagination/pagination";
import { useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SliderItem } from "@/lib/models";

interface SliderComponentProps {
  slides: SliderItem[];
}

export default function SliderComponent({ slides }: SliderComponentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (slides.length > 1) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePaginationChange = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    resetTimer();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  if (!slides || slides.length === 0) return null;

  const slide = slides[currentSlide];

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider_container_wrapper}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={styles.slide_container}
          >
            <Image
              className={styles.slider__image}
              width={1920}
              height={800}
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${slide.imageUrl}`}
              alt="slide"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <button
          className={`${styles.nav_button} ${styles.nav_button_prev}`}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ArrowLeftSvg fill="#fff" />
        </button>
        <button
          className={`${styles.nav_button} ${styles.nav_button_next}`}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ArrowLeftSvg
            fill="#fff"
            style={{ transform: "rotate(180deg)" }}
          />
        </button>

        <div className={styles.slider__wrapper}>
          <h2 className={styles.slider__title}>{slide.title}</h2>
          <Link href={slide.link || "/catalog"} className={styles.slider__button}>
            <MenuSvg
              stroke="#fff"
              width={24}
              height={24}
              className={styles.slider__button_icon}
            />{" "}
            {slide.type === 'CATEGORY' ? 'Открыть каталог' : slide.type === 'PRODUCT' ? 'Посмотреть товар' : 'Посмотреть проект'}
          </Link>
        </div>
      </div>

      <PaginationComponent
        totalSteps={slides.length}
        currentStep={currentSlide}
        onChange={handlePaginationChange}
      />
    </div>
  );
}
