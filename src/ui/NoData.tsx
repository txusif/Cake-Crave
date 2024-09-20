import emptyCart from "/assets/emptyCart.png";

export default function NoData() {
  return (
    <div className="flex w-[200px] flex-col items-center gap-2 md:w-[300px]">
      <img className="w-full" src={emptyCart} alt="empty cart" />
      <p className="text-center text-sm md:text-base">
        <span className="text-xl font-semibold md:text-2xl">"Uh-oh!</span>
        <br /> Our cart is on a diet. It needs some items to feast on. What will
        you add today?"
      </p>
    </div>
  );
}
