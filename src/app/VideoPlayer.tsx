import React, {useEffect, useRef, useState} from "react";
import PlaySvgComponent from "@/lib/icon-svg/media"; // Убедитесь, что пути к SVG-компонентам верны
import {CloseSvg} from "@/lib/icon-svg";
import {motion, AnimatePresence} from "framer-motion";

// --- VideoPlayer Component ---
interface VideoPlayerProps {
    src: string;
    poster?: string; // Добавляем пропс для постера
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(error => console.log("Video autoplay failed:", error));
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            poster={poster || "/images/image-poster.jpeg"}
            autoPlay={true}
            controls
            // muted
            loop
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
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ onShowVideo, posterSrc, title = "Видео" }) => {
    return (
        <div className="video-preview-item" onClick={onShowVideo}> {/* Клик по всей области */}
            <div className="video-preview-image-wrapper">
                <img
                    src={posterSrc ? `${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'' + posterSrc}` : '/images/image-poster.jpeg'}
                    alt={`Превью ${title}`}
                    className="video-preview-poster"
                />
                <div className="video-preview-overlay">
                    {/* <button
                        className="video-preview-play-button"
                        aria-label={`Начать воспроизведение ${title}`}
                    >
                        <PlaySvgComponent/>
                    </button> */}
                </div>
            </div>
            {/* <h4 className="video-preview-title">{title}</h4> */}
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
    src: string;
    isShow: boolean;
    handleOnClose: () => void;
    poster?: string;
    description: string
    projectLink?: string; // Добавляем опциональный пропс для ссылки на проект
}

export const VideoShowModal: React.FC<VideoShowModalProps> = ({ src, isShow, handleOnClose, poster, projectLink, description }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Обработка нажатия Esc и клика вне модального окна
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleOnClose();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleOnClose();
            }
        };

        if (isShow) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside); // Добавляем обработчик клика
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isShow, handleOnClose]);

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
                    aria-labelledby="video-modal-title"
                    onClick={handleOnClose} // Клик по оверлею закрывает модальное окно
                >
                    <div
                        className="modal-content-wrapper"
                        ref={modalRef} // Привязываем ref к содержимому модального окна
                        onClick={e => e.stopPropagation()} // Останавливаем всплытие клика, чтобы он не закрывал окно
                    >
                        <div className="modal-header-container">
                            <h2 id="video-modal-title" className="visually-hidden">Видео</h2>
                            <button
                                onClick={handleOnClose}
                                className="modal-close-button"
                                aria-label="Закрыть видео"
                            >
                                <CloseSvg stroke="white" />
                            </button>
                        </div>
                        <div className="scroll-container">
                            <div className="video-container">
                                <VideoPlayer src={src} poster={poster} />
                            </div>
                            <div className="modal-description-container">
                                <h3>Описание видео</h3>
                                <p>{description}</p>

                                {projectLink && (
                                    <div className="project-link-section">
                                        <h4>Ссылка на проект:</h4>
                                        <a href={projectLink} rel="noopener noreferrer" className="project-link">
                                            {projectLink.replace(/^(https?:\/\/)?(www\.)?/,'').split('/')[0]}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};