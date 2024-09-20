import searchCakeImage from "/assets/searchCake.png";

export default function SearchMessage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img
        className="w-[200px] md:w-[300px]"
        src={searchCakeImage}
        alt="cheffest"
      />
      <p className="text-sm text-MediumGrey">
        Hello, what are you feeling to eat today... 🤤
      </p>
    </div>
  );
}
