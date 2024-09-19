type SwitchProps = {
  title: string;
  handleVeganClick?: () => void;
  handleEgglessClick?: () => void;
  isBtnOn: {
    vegan: boolean;
    eggless: boolean;
  };
};

export default function Switch({
  title,
  handleVeganClick,
  handleEgglessClick,
  isBtnOn,
}: SwitchProps) {
  function handleClick() {
    if (title === "vegan") {
      handleVeganClick?.();
    } else {
      handleEgglessClick?.();
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3" onClick={handleClick}>
      <h3 className="text-xs font-medium capitalize text-Grey sm:text-base">
        {title}
      </h3>
      <div
        className={`button ${title === "vegan" && isBtnOn.vegan && "vegan"} ${title === "eggless" && isBtnOn.eggless && "eggless"}`}
      ></div>
    </div>
  );
}
