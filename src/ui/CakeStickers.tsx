import Rating from "./Rating";

type CakeStickersProps = {
  rating?: number;
  gap?: string;
  width?: string;
  height?: string;
  padding?: string;
  image: string;
  alt: string;
  type: string;
  title?: string;
};

export default function CakeStickers({
  rating,
  gap = "gap-2",
  width = "w-[30px]",
  height = "h-[30px]",
  padding = "p-1",
  image,
  alt,
  type,
  title,
}: CakeStickersProps) {
  return (
    <div className={`flex ${gap} items-center`}>
      <div
        className={`${width} ${height} ${padding} flex items-center justify-center rounded-full bg-LightGrey`}
      >
        <img src={image} alt={rating !== undefined ? rating.toString() : alt} />
      </div>
      {type === "star" && <Rating rating={Math.floor(rating ?? 0)} size="lg" />}
      <span
        className={` ${(type === "star" && "text-base text-Yellow") || (type === "non-veg" && "text-Red") || (type === "veg" && "text-Green") || (type === "cuisine" && "font-light text-Grey")} mt-1 text-sm font-semibold capitalize text-Grey`}
      >
        {type === "star" && (rating ?? 0)}
        {title}
      </span>
    </div>
  );
}
