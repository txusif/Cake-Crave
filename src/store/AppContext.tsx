import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@/features/Authentication/useUser";
import { useAddToCart } from "@/features/Cart/useAddToCart";
import { useDeleteItem } from "@/features/Cart/useClearCart";
import { useDecreaseCount } from "@/features/Cart/useDecreaseCount";
import { useIncreaseCount } from "@/features/Cart/useIncreaseCount";
import { useRemoveFromCart } from "@/features/Cart/useRemoveFromCart";
import { useEmptyCart } from "@/features/Order/useEmptyCart";
import { NewItemType } from "@/services/apiCakes";
import { placeHolderImage } from "@/utils/GlobalConst";

interface AppContextType {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDecrease: (item: any) => void;
  handleIncrease: (item: any) => void;
  isCartLoading: boolean;
  handleCloseCart: () => void;
  handleDelete: (id: number) => void;
  handleAddItem: (item: any) => void;
  handleEmptyCart: () => void;
  removeItem: (item: any) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  handleCheckOut: () => void;
  isCoupon: boolean;
  setCoupon: React.Dispatch<React.SetStateAction<boolean>>;
  isCouponApplicable: { minBillValue: number; isCouponApplicable: boolean };
  setIsCouponApplicable: React.Dispatch<
    React.SetStateAction<{ minBillValue: number; isCouponApplicable: boolean }>
  >;
  setCartDetails: React.Dispatch<React.SetStateAction<any>>;
  cartDetails: any;
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  viewPortWidth: number;
  isTestId: boolean;
}

const Context = createContext<AppContextType | null>(null);

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const { increaseItem, isPending: isIncreasing } = useIncreaseCount();
  const { decreaseItem, isPending: isDecreasing } = useDecreaseCount();
  const { deleteItem, isPending: isDeleting } = useDeleteItem();
  const { addItem, isPending: isAdding } = useAddToCart();
  const { removeItem, isPending: isRemoving } = useRemoveFromCart();
  const { emptyCart, isPending: isClearingCart } = useEmptyCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(placeHolderImage);
  const [isCoupon, setCoupon] = useState(false);
  const [isCouponApplicable, setIsCouponApplicable] = useState(() => {
    return { minBillValue: 0, isCouponApplicable: true };
  });
  const [cartDetails, setCartDetails] = useState({});
  const [profile, setProfile] = useState();
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);
  const { user } = useUser();
  const isTestId = user?.id === "xyz";
  const isCartLoading =
    isDecreasing ||
    isIncreasing ||
    isDeleting ||
    isAdding ||
    isRemoving ||
    isClearingCart;

  function handleCloseCart() {
    setIsCartOpen(false);
  }

  function handleIncrease(item: NewItemType) {
    increaseItem(item);
  }

  function handleDecrease(item: NewItemType) {
    decreaseItem(item);
  }

  function handleDelete(id: number) {
    deleteItem(id);
  }

  function handleAddItem(item: NewItemType) {
    addItem(item);
  }

  function handleCheckOut() {
    setIsCartOpen(false);
  }
  function handleEmptyCart() {
    emptyCart();
  }

  document.body.addEventListener("click", () => {
    setIsMenuOpen(false);
  });

  useEffect(() => {
    const updateWidth = () => {
      setViewPortWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Context.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        handleDecrease,
        handleIncrease,
        isCartLoading,
        handleCloseCart,
        handleDelete,
        handleAddItem,
        handleEmptyCart,
        removeItem,
        isMenuOpen,
        setIsMenuOpen,
        userName,
        setUserName,
        avatar,
        setAvatar,
        handleCheckOut,
        isCoupon,
        setCoupon,
        isCouponApplicable,
        setIsCouponApplicable,
        setCartDetails,
        cartDetails,
        profile,
        setProfile,
        viewPortWidth,
        isTestId,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  const context = useContext(Context);
  if (!context)
    throw new Error("Please use context within the context provider.");
  return context;
}
