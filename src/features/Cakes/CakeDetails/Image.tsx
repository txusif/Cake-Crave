import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageProps {
  images: string[];
  name: string;
  size?: string;
}

export default function Image({
  images,
  name,
  size = "w-[100px]",
}: ImageProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div
      className={`${size} relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg`}
    >
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img
                className="h-full w-auto object-cover lg:object-contain"
                src={image}
                alt={name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <img
        className="h-full w-auto object-cover lg:object-contain"
        src={image[0]}
        alt={name}
      />
      <img
        className="absolute top-0 z-[-1] h-full w-full scale-105 object-cover blur-[6px] brightness-[0.6]"
        src={image[0]}
        alt={name}
      /> */}
    </div>
  );
}
