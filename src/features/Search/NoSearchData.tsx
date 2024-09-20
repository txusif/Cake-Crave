import cakeNotFound from "/assets/cakeNotFound.png";

export default function NoSearchData() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-[200px]">
        <img src={cakeNotFound} alt="no data" />
      </div>
      <p className="text-sm text-MediumGrey">
        We&apos;re sorry. We were not able to find a match :(
      </p>
    </div>
  );
}
