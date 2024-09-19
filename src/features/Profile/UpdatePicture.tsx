import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/store/AppContext";
import Button from "@/ui/Button";
import { placeHolderImage } from "@/utils/GlobalConst";
import { useUpdatePicture } from "./useUpdatePicture";
import { useRemovePicture } from "./useRemovePicture";

type AppContextType = {
  avatar: string;
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
};

export default function UpdatePicture({ isTestId }: { isTestId: boolean }) {
  const { updatePicture, isPending: isUploading } = useUpdatePicture();
  const { removePicture, isPending: isRemoving } = useRemovePicture();
  const { handleSubmit } = useForm();
  const { avatar, profile, setProfile }: AppContextType = useAppContext();

  const profilePreview = profile ? URL.createObjectURL(profile) : null;

  function onSubmit() {
    updatePicture(profile);
  }

  function handleRemoveImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    removePicture();
    setProfile(null);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative w-[200px]">
        <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
          <img
            className="w-auto"
            src={profilePreview || avatar}
            alt="profile"
          />
        </div>
        <label
          htmlFor="upload"
          className="absolute bottom-[5px] right-[15px] flex cursor-pointer items-center justify-center rounded-full bg-LightGrey p-2 shadow-md"
        >
          <FaEdit
            className={`relative right-[-2px] top-[-2px] text-2xl text-Grey ${isTestId && "cursor-not-allowed"}`}
          />
          <input
            className={`hidden ${isTestId && "cursor-not-allowed"}`}
            disabled={isTestId}
            id="upload"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setProfile(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full justify-between gap-6">
          <Button
            type={"file"}
            disabled={isUploading || !profile || isTestId}
            isPending={isUploading}
          >
            Upload
          </Button>
          <Button
            onClick={() => handleRemoveImage}
            type={"remove"}
            disabled={isRemoving || avatar === placeHolderImage || isTestId}
            isPending={isRemoving}
          >
            Remove
          </Button>
        </div>
      </form>
    </div>
  );
}
