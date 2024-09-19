import { useAppContext } from "@/store/AppContext";
import UpdatePicture from "./UpdatePicture";
import UpdatePassword from "./UpdatePassword";

export default function ProfileSettings() {
  const { isTestId } = useAppContext();

  window.scrollTo({
    top: 0,
  });

  return (
    <>
      <div className="h-[60px] sm:h-[80px] md:h-[100px]"></div>
      <div className="flex flex-col items-center justify-center p-8 sm:p-10 md:p-14">
        <div className="flex flex-col items-center gap-12">
          <UpdatePicture isTestId={isTestId} />

          {isTestId && (
            <p className="text-center text-xs text-Red">
              You cannot make any changes to this account, sign up to use this
              feature.
            </p>
          )}
          <UpdatePassword isTestId={isTestId} />
        </div>
      </div>
    </>
  );
}
