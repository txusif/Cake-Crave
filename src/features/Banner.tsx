import { banner1 } from "@/utils/GlobalConst";

export default function Banner() {
  return (
    <>
      <div className="h-[60px] sm:h-[80px] md:h-[100px]"></div>
      <div className="relative flex items-center justify-center">
        <div className="max-w-[576px]">
          <img src={banner1} alt="banner" />
        </div>
        <div className="absolute z-[-10] hidden w-screen max-w-max blur-sm brightness-[0.75] sm:block">
          <img className="w-full scale-[1.03]" src={banner1} alt="banner" />
        </div>
      </div>
    </>
  );
}
