import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useAppContext } from "@/store/AppContext";
import { useUser } from "@/features/Authentication/useUser";

type AppContextType = {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, fetchStatus, user } = useUser();
  const { setUserName, avatar, setAvatar }: AppContextType = useAppContext();

  useEffect(() => {
    setAvatar((ps) => {
      return user?.user_metadata?.image || ps;
    });
    setUserName(user?.user_metadata?.fullName || "unknown");

    if (!isAuthenticated && !isLoading && fetchStatus === "idle")
      navigate("/login");
  }, [
    isLoading,
    isAuthenticated,
    navigate,
    fetchStatus,
    user,
    setUserName,
    setAvatar,
    avatar,
  ]);

  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) return <>{children}</>;
  return <>{children}</>;
}
