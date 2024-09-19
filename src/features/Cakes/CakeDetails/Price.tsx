import { currencyFormatter } from "@/utils/helper";

export default function Price({ price }: { price: number }) {
  return (
    <div className="flex justify-center gap-2 sm:justify-normal">
      <span className="text-lg font-semibold text-Orange md:text-xl">₹</span>
      <span className="text-2xl font-bold text-DarkGrey md:text-3xl">
        {currencyFormatter(Math.ceil(price))}
      </span>
    </div>
  );
}
