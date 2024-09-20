/* eslint-disable react/prop-types */

import SmallLoader from "./SmallLoader";

export default function Button({
  children,
  onClick,
  type,
  disabled,
  isPending,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "clear" | "cancle" | "checkout" | "login" | "file" | "remove";
  disabled?: boolean;
  isPending?: boolean;
}) {
  if (type === "clear" || type === "cancle")
    return (
      <button
        disabled={disabled}
        type="button"
        onClick={onClick}
        className={`relative flex items-center justify-center gap-2 rounded-md border-[3px] border-Orange p-3 text-sm font-semibold uppercase text-Orange transition duration-300 hover:border-orange-500 hover:text-orange-500 ${disabled && "cursor-not-allowed"}`}
      >
        {children}
      </button>
    );

  if (type === "checkout" || type === "login")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`buttonCheckout relative flex items-center justify-center gap-3 overflow-hidden rounded-md border-2 border-DarkGreen bg-Green p-3 text-sm font-semibold uppercase tracking-wide text-White shadow-md active:bg-DarkGreen ${disabled && "cursor-not-allowed"}`}
      >
        {children}
        {isPending && <SmallLoader showLoading={false} />}
      </button>
    );

  if (type === "file")
    return (
      <button
        disabled={disabled}
        className={`hover:text-gray-500' flex gap-2 rounded-md bg-Green p-3 px-6 text-sm font-semibold uppercase text-DarkGreen transition duration-200 ${disabled && "cursor-not-allowed bg-LightGrey disabled:text-Grey"}`}
        onClick={onClick}
      >
        {children} {isPending && <SmallLoader showLoading={false} />}
      </button>
    );
  if (type === "remove")
    return (
      <button
        disabled={disabled}
        className={`flex gap-2 rounded-md bg-red-400 p-3 px-6 text-sm font-semibold uppercase text-red-700 transition duration-200 hover:text-red-800 ${disabled && "cursor-not-allowed disabled:bg-LightGrey disabled:text-Grey"}`}
        type="button"
        onClick={onClick}
      >
        {children} {isPending && <SmallLoader showLoading={false} />}
      </button>
    );
}
