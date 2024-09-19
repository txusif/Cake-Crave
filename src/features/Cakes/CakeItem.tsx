import { LiaRupeeSignSolid } from "react-icons/lia";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useCakes } from "./useCakes";
import { currencyFormatter } from "@/utils/helper";
import ButtonCart from "@/ui/ButtonCart";
import Rating from "@/ui/Rating";

export default function CakeItem() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cakeItems } = useCakes();
  const navigate = useNavigate();

  function handleClickCake(id: string) {
    searchParams.set("cakeId", id);
    setSearchParams(searchParams);
    navigate(`/cakes/${id}`);
  }

  return (
    <>
      {cakeItems?.map((item) => {
        return (
          <div
            key={item.name}
            className="relative flex w-[160px] cursor-pointer flex-col rounded-xl border-[5px] border-White bg-White shadow-xl outline outline-2 outline-LightGrey transition duration-300 hover:scale-105 hover:shadow-2xl sm:w-[180px]"
            onClick={() => handleClickCake(String(item.id))}
          >
            <div className="h-[135px] w-auto overflow-hidden rounded-xl">
              <div
                className={`absolute left-[-9px] top-3 ml-[-1px] rounded-r-md bg-white p-1 px-2 pt-[5px] text-[10px] font-bold uppercase tracking-wide shadow-md ${item.type === "vegan" ? "text-Green" : "text-Red"} `}
              >
                {item.type}
              </div>
              <img
                src={item.images[0] || "/assets/dummy-cake.png"}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-auto flex-grow flex-col gap-1 p-2">
              <p className="text-xs font-semibold text-DarkGrey">{item.name}</p>
              <div className="flex gap-1">
                <Rating rating={Math.floor(item.rating)} />
                <p className="text-xs">{Math.floor(item.rating)}</p>
              </div>
              <div className="mb-auto flex items-center text-xl">
                <LiaRupeeSignSolid className="mt-[-4px] stroke-[0.8] text-Yellow" />
                <p className="text-2xl font-bold tracking-tight text-DarkGrey">
                  {currencyFormatter(Math.ceil(item.price))}
                </p>
              </div>
              <ButtonCart item={item} />
            </div>
          </div>
        );
      })}
    </>
  );
}
