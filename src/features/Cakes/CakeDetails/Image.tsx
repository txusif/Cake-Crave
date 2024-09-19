interface ImageProps {
  image: string;
  name: string;
  size?: string;
}

export default function Image({ image, name, size = "w-[100px]" }: ImageProps) {
  return (
    <div
      className={` ${size} relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg`}
    >
      <img
        className="h-full w-auto object-cover lg:object-contain"
        src={image}
        alt={name}
      />
      <img
        className="absolute top-0 z-[-1] h-full w-full scale-105 object-cover blur-[6px] brightness-[0.6]"
        src={image}
        alt={name}
      />
    </div>
  );
}
