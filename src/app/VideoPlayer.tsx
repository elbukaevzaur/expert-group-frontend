import React, {useEffect, useRef, useState, useCallback} from "react";
import PlaySvgComponent from "@/lib/icon-svg/media"; // Убедитесь, что пути к SVG-компонентам верны
import {CloseSvg, ArrowLeftSvg, ArrowRightSvg} from "@/lib/icon-svg";
import {motion, AnimatePresence} from "framer-motion";

import { Shorts } from "@/lib/models/shorts";

// --- Variants outside to prevent unnecessary re-renders ---
const modalVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0
    })
};

// --- VideoPlayer Component ---
interface VideoPlayerProps {
    src: string;
    poster?: string; // Добавляем пропс для постера
    onEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, onEnded }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(error => {
                if (error.name !== 'AbortError') {
                    console.log("Video autoplay failed:", error);
                }
            });
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            poster={poster ? `${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${poster}` : "/images/image-poster.jpeg"}
            autoPlay={true}
            controls
            onEnded={onEnded}
            loop={!onEnded}
            className="video-player-element"
        >
            <source src={src} type="video/mp4"/>
            Ваш браузер не поддерживает видео.
        </video>
    );
};

export default VideoPlayer;

// --- VideoPreview Component ---
interface VideoPreviewProps {
    onShowVideo: () => void;
    posterSrc?: string; // Добавим пропс для постера
    title?: string; // Добавим заголовок для превью
    projectName?: string; // Добавим название проекта
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ onShowVideo, posterSrc, title = "Видео", projectName }) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    return (
        <div className="video-preview-wrapper" onClick={onShowVideo}>
            <div className="video-preview-item">
                <div className="video-preview-image-wrapper">
                    <img
                        src={posterSrc ? `/api/proxy/images/get/product?name=${posterSrc}` : '/images/image-poster.jpeg'}
                        alt={`Превью ${title}`}
                        className="video-preview-poster"
                        onError={(e) => {
                            if (posterSrc && !e.currentTarget.src.includes(apiBaseUrl) && apiBaseUrl) {
                                e.currentTarget.src = `${apiBaseUrl}/images/get/product?name=${posterSrc}`;
                            } else {
                                e.currentTarget.src = '/images/image-poster.jpeg';
                            }
                        }}
                    />
                    <div className="video-preview-overlay" />
                </div>
            </div>
            <div className="video-preview-info">
                <h4 className="video-preview-title">{title}</h4>
                {projectName && <span className="video-preview-project">{projectName}</span>}
            </div>
        </div>
    );
};

// --- VideoCarousel Component ---
interface VideoCarouselProps {
    videos: {
        src: string;
        posterSrc?: string;
        title?: string;
    }[];
    onVideoSelect: (src: string, posterSrc?: string) => void;
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, onVideoSelect }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -scrollContainerRef.current.offsetWidth * 0.8, // Прокрутка на 80% ширины контейнера
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: scrollContainerRef.current.offsetWidth * 0.8, // Прокрутка на 80% ширины контейнера
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="video-carousel-wrapper">
            <button onClick={scrollLeft} className="carousel-scroll-button carousel-scroll-button-left" aria-label="Прокрутить влево">
                &lt;
            </button>
            <div className="video-carousel-container" ref={scrollContainerRef}>
                {videos.map((video, index) => (
                    <VideoPreview
                        key={index}
                        posterSrc={video.posterSrc}
                        title={video.title}
                        onShowVideo={() => onVideoSelect(video.src, video.posterSrc)}
                    />
                ))}
            </div>
            <button onClick={scrollRight} className="carousel-scroll-button carousel-scroll-button-right" aria-label="Прокрутить вправо">
                &gt;
            </button>
        </div>
    );
};

// --- VideoShowModal Component ---
interface VideoShowModalProps {
    shorts: Shorts[];
    initialIndex: number;
    isShow: boolean;
    handleOnClose: () => void;
}

export const VideoShowModal: React.FC<VideoShowModalProps> = ({ shorts, initialIndex, isShow, handleOnClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const modalRef = useRef<HTMLDivElement>(null);

    // Sync state when modal opens
    useEffect(() => {
        if (isShow) {
            setCurrentIndex(initialIndex);
        }
    }, [isShow, initialIndex]);

    const handleNext = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setDirection(1);
        setCurrentIndex((prevIndex) => 
            prevIndex < shorts.length - 1 ? prevIndex + 1 : 0
        );
    }, [shorts.length]);

    const handlePrev = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setDirection(-1);
        setCurrentIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : shorts.length - 1
        );
    }, [shorts.length]);

    // Swipe support
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) handleNext();
        else if (distance < -minSwipeDistance) handlePrev();
        setTouchStart(null);
    };

    // Обработка нажатия Esc, стрелок и клика вне модального окна
    useEffect(() => {
        if (!isShow) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleOnClose();
            } else if (event.key === 'ArrowRight') {
                handleNext();
            } else if (event.key === 'ArrowLeft') {
                handlePrev();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isShow, handleOnClose, handleNext, handlePrev]);

    const currentShort = shorts[currentIndex];
    if (!currentShort) return null;

    const projectLink = currentShort?.project ? `https://proeg.ru/projects/${currentShort.project.projectCategoryId}/details/${currentShort.projectId}` : undefined;

    return (
        <AnimatePresence>
            {isShow && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="video-show-modal"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleOnClose();
                        }
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <button 
                        className="modal-global-close" 
                        onClick={handleOnClose}
                        aria-label="Закрыть"
                    >
                        <CloseSvg color="white" width={30} height={30} />
                    </button>

                    <button 
                        className="modal-nav-button prev" 
                        onClick={handlePrev} 
                        aria-label="Предыдущее видео"
                    >
                        <ArrowLeftSvg />
                    </button>

                    <div
                        className="modal-content-wrapper"
                        ref={modalRef}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header-container">
                            <button
                                onClick={handleOnClose}
                                className="modal-close-button"
                                aria-label="Закрыть видео"
                            >
                                <CloseSvg color="white" />
                            </button>
                        </div>
                        
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div 
                                key={currentIndex}
                                custom={direction}
                                variants={modalVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="scroll-container"
                            >
                                <div className="video-container">
                                    <div className="video-nav-overlay">
                                        <div className="video-nav-side prev" onClick={handlePrev} />
                                        <div className="video-nav-side next" onClick={handleNext} />
                                    </div>
                                    <VideoPlayer 
                                        src={`/api/proxy/shorts/video/${currentShort.fileName}`} 
                                        poster={currentShort.previewImageName}
                                        onEnded={() => handleNext()} 
                                    />
                                </div>
                                <div className="modal-description-container">
                                    <div className="modal-description-header">
                                        <div>
                                            <h3 id="video-modal-title">{currentShort.name}</h3>
                                            {currentShort.project && (
                                                <div className="modal-project-info">
                                                    <span className="modal-project-badge">{currentShort.project.name}</span>
                                                    {/* Можно добавить адрес или категорию если есть */}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleOnClose}
                                            className="modal-close-button-inner"
                                            aria-label="Закрыть"
                                        >
                                            <CloseSvg color="white" />
                                        </button>
                                    </div>
                                    <div className="modal-description-content">
                                        <div className="description-text">
                                            <p>{currentShort.description}</p>
                                        </div>

                                        {projectLink && (
                                            <div className="project-link-section">
                                                <p className="project-link-label">Узнать больше о проекте:</p>
                                                <a href={projectLink} rel="noopener noreferrer" className="project-link">
                                                    Смотреть проект <ArrowRightSvg style={{ width: 16, height: 16, marginLeft: 8 }} />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="modal-footer-nav">
                                        <span className="shorts-counter">
                                            {currentIndex + 1} / {shorts.length}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button 
                        className="modal-nav-button next" 
                        onClick={handleNext} 
                        aria-label="Следующее видео"
                    >
                        <ArrowRightSvg />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};