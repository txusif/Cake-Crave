import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import Price from "./Price";
import Name from "./Name";
import Description from "./Description";
import Ingredients from "./Ingredients";
import Image from "./Image";
import MealCount from "./MealCount";
import LoadingScreen from "@/ui/LoadingScreen";
import { useAppContext } from "@/store/AppContext";
import { useCakes } from "../useCakes";
import SmallLoader from "@/ui/SmallLoader";
import CakeStickers from "@/ui/CakeStickers";
import ratingStar from "/assets/ratingStar.png";
import eggless from "/assets/eggless.png";
import vegan from "/assets/vegan.png";
import cuisine from "/assets/cuisine.png";
import ButtonCart from "@/ui/ButtonCart";
import { useCart } from "@/features/Cart/useCart";

export default function CakeDetails() {
  const { cakeItems, isLoading } = useCakes();
  const { data: cartData, isPending } = useCart();
  const { isCartLoading } = useAppContext();
  const navigate = useNavigate();

  if (isLoading || isPending) return <LoadingScreen />;

  return (
    <div className="flex w-full flex-col justify-center overflow-scroll p-4 sm:p-10 md:px-24 lg:h-full">
      {cakeItems?.map((item) => {
        return (
          <div
            key={item.id}
            className="mx-auto flex flex-col items-center justify-center gap-6 pt-[60px] md:pt-[100px] lg:pt-[40px]"
          >
            <div className="self-end">
              <IoClose
                className="cursor-pointer text-3xl text-Red md:text-4xl"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-12">
              <Image
                size="w-[300px] lg:max-w-[40%]"
                image={item.images[0]}
                name={item.name}
              />
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col gap-2 md:items-start">
                  <div className="flex w-full justify-center text-center sm:justify-normal">
                    <Name name={item.name} />
                    {isCartLoading && <SmallLoader showLoading={false} />}
                  </div>
                  <Description description={item.description} />
                  <Ingredients ingredients={item.ingredients} />
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:justify-normal md:gap-x-12 md:gap-y-6">
                  {item.type === "vegan" ? (
                    <CakeStickers
                      title={item.type}
                      image={vegan}
                      alt={item.type}
                      type={"vegan"}
                      padding="p-[6px] md:p-[8px]"
                      width="w-[30px] md:w-[40px]"
                      height="h-[30px] md:h-[40px]"
                    />
                  ) : (
                    <CakeStickers
                      title={item.type}
                      image={eggless}
                      alt={item.type}
                      type={"eggless"}
                      padding="p-[6px] md:p-[8px]"
                      width="w-[30px] md:w-[40px]"
                      height="h-[30px] md:h-[40px]"
                    />
                  )}
                  <CakeStickers
                    title={item.category}
                    image={cuisine}
                    alt={item.category}
                    type={"cuisine"}
                    padding="p-[6px] md:p-[8px]"
                    width="w-[30px] md:w-[40px]"
                    height="h-[30px] md:h-[40px]"
                  />
                  <CakeStickers
                    image={ratingStar}
                    alt={String(item.rating)}
                    rating={item.rating}
                    type={"star"}
                    gap="gap-2"
                    padding="p-[6px] md:p-[8px]"
                    width="w-[30px] md:w-[40px]"
                    height="h-[30px] md:h-[40px]"
                  />
                </div>
                <Price price={item.price} />
                <div className="flex flex-col items-start gap-4">
                  <MealCount cartData={cartData} item={item} />
                  <ButtonCart item={item} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
