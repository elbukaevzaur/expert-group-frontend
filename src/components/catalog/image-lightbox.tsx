"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { ProductImages } from "@/lib/models";

interface ImageLightboxProps {
  open: boolean;
  close: () => void;
  images: ProductImages[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
  autoFullscreen?: boolean;
}

export default function ImageLightbox({
  open,
  close,
  images,
  currentIndex,
  onIndexChange,
  autoFullscreen = false,
}: ImageLightboxProps) {
  const slides = images.map((img) => ({
    src: `${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=large_${img.imagePath}`,
  }));

  return (
    <Lightbox
      open={open}
      close={close}
      index={currentIndex}
      slides={slides}
      plugins={[Zoom, Thumbnails, Counter, Fullscreen, Slideshow]}
      fullscreen={{ auto: autoFullscreen }}
      on={{
        view: ({ index }) => onIndexChange?.(index),
      }}
      styles={{
        root: { "--yarl__thumbnails_thumbnail_active_border_color": "#21a038" } as any,
        thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        thumbnail: { borderRadius: "4px" },
      }}
      render={{
        buttonPrev: images.length <= 1 ? () => null : undefined,
        buttonNext: images.length <= 1 ? () => null : undefined,
      }}
    />
  );
}
