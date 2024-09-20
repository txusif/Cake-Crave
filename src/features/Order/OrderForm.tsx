import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useNewOrder } from "./useNewOrder";
import { useAppContext } from "@/store/AppContext";
import FormMessage from "@/ui/FormMessage";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import BackgroundCover from "@/ui/BackgroundCover";
import orderFormBanner from "/assets/banners/orderForm-banner.png";
import { useUser } from "../Authentication/useUser";
import { CartDataType } from "../Cakes/CakeDetails/CakeCount";

export default function OrderForm() {
  const { user } = useUser();
  const { newOrder, isPending } = useNewOrder();
  const {
    cartDetails,
    setIsCartOpen,
  }: {
    cartDetails: { cartItems: CartDataType[] };
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  } = useAppContext();

  const fullName: string = user?.user_metadata?.fullName || "";
  const id: string = user?.id || "";

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      fullName: fullName,
      phoneNumber: "0123456789",
      address: "O Block, BKC, Mumbai",
    },
  });
  const { errors } = formState;
  const navigate = useNavigate();

  function handleCancleOrder() {
    navigate(-1);
    setIsCartOpen(true);
  }

  function onSubmit(data: {
    fullName: string;
    phoneNumber: string;
    address: string;
  }) {
    const { fullName, phoneNumber, address } = data;
    const orderDetails = {
      userId: id,
      fullName,
      phoneNumber,
      address,
      cartDetails,
    };

    if (Object.keys(orderDetails.cartDetails).length > 0) {
      newOrder(orderDetails);
    } else {
      toast.error("You cart is empty");
    }
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center sm:bg-Black/40">
        <div className="h-[60px] sm:h-[80px] md:h-[100px]"></div>
        <div className="flex w-screen flex-col gap-4 overflow-auto rounded-xl bg-White p-8 shadow-lg outline outline-1 outline-Grey/40 sm:h-auto sm:w-[570px] sm:p-10 md:p-12">
          <FormMessage
            title={"Place your order"}
            message={"Only one step away to enjoy the tasty meal..."}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <Input
                title={"Full Name"}
                id={"fullName"}
                placeholder={"Your name"}
                register={register("fullName", {
                  required: "This field is required",
                })}
                errors={errors}
              />
              <Input
                title={"Phone Number"}
                id={"phoneNumber"}
                type={"number"}
                placeholder={"Your number"}
                register={register("phoneNumber")}
              />
              <Input
                title={"Address"}
                id={"address"}
                placeholder={"Your Address"}
                register={register("address", {
                  required: "This field is required",
                })}
                errors={errors}
              />
            </div>
            <div className="flex w-full flex-col justify-center gap-4">
              <Button
                isPending={isPending}
                disabled={isPending}
                type="checkout"
              >
                Order
              </Button>
              <Button
                isPending={isPending}
                disabled={isPending}
                type="cancle"
                onClick={handleCancleOrder}
              >
                Cancle
              </Button>
            </div>
          </form>
        </div>
        <BackgroundCover coverBanner={orderFormBanner} />
      </div>
    </>
  );
}
