import React, {useEffect, useRef, useState} from "react";
import PlaySvgComponent from "@/lib/icon-svg/media";
import {CloseSvg} from "@/lib/icon-svg";
import {motion} from "framer-motion";

interface VideoPlayerProps {
    src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef}>
            <video
                style={{borderRadius: 8}}
                ref={videoRef}
                // poster="/images/image-poster.jpeg"
                autoPlay={true}
            >
                <source src={src} type="video/mp4"/>
                Ваш браузер не поддерживает видео.
            </video>
        </div>
    );
};

export default VideoPlayer;

interface VideoPreviewProps {
    onShowVideo: () => void;
}

export const VideoPreview = (props: VideoPreviewProps) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPoster, setShowPoster] = useState(true);

    const togglePlay = () => {
        props.onShowVideo();
    }

    return <div ref={containerRef} style={{position: 'relative'}}>
        {showPoster && (
            <img
                style={{
                    width: 186,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                src='/images/image-poster.jpeg'
                alt="Видео превью"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
        )}

        {/* Кнопка Play/Pause */}
        {!isPlaying && (
            <div style={{
                border: '4px solid #21A038',
                borderRadius: 8,
                boxShadow: '0px 0px 10.9px 3px #21a03863',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                display: "flex",
                justifyContent: 'center',
            }}>
                <button
                    onClick={togglePlay}
                    style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                >
                    <PlaySvgComponent/>
                </button>
            </div>
        )}
    </div>
}

interface VideoShowModalProps {
    src: string;
    onClose: () => void
}

export const VideoShowModal = (props: VideoShowModalProps) => {
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        if (props.src !== '') {
            setIsShow(true)
        }else {
            setIsShow(false)
        }
    }, [props.src]);

    const handleOnClose = () => {
        setIsShow(false);
        setTimeout(() => {
            props.onClose();
        }, 500)
    }

    return <motion.div
        initial={{opacity: 0}}
        animate={isShow ? {opacity: 1} : {opacity: 0}}
        transition={{duration: 0.5}}
        className="video_show_modal"
    >
        <div className="modal_header_container">
            <button onClick={handleOnClose} style={{background: 'transparent', border: 0, cursor: 'pointer'}}>
                <CloseSvg/>
            </button>
        </div>
        <div className="scroll_container">
            <div className="video_container">
                <VideoPlayer src={props.src}/>
            </div>
            <div className="modal_desc_container">
                <span>Описание</span>
                <span>Описание</span>
                <span>Описание</span>
                <span>Описание</span>
                <span>Описание</span>
            </div>
        </div>
    </motion.div>
}