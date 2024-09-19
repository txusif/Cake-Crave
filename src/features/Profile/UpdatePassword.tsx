import Button from "@/ui/Button";
import Input from "@/ui/Input";
import SmallLoader from "@/ui/SmallLoader";
import { useForm } from "react-hook-form";
import useUpdatePassword from "./useUpdatePassword";

export default function UpdatePassword({ isTestId }: { isTestId: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{ password: string; confirmPassword: string }>();
  const { updatePassword, isPending } = useUpdatePassword();

  function onSubmit(data: { password: string; confirmPassword: string }) {
    const newPassword = data.confirmPassword;
    updatePassword(newPassword);
  }

  return (
    <div className="flex min-w-[300px] flex-col gap-4 rounded-md p-8 outline outline-1 outline-Grey/30 sm:w-[400px]">
      <h1 className="text-xl font-semibold uppercase text-Black">
        Update Password
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            title={"Password"}
            id={"password"}
            placeholder={"Enter password"}
            register={register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Should be atleast 6 characters",
              },
            })}
            errors={errors}
          />
          <Input
            title={"Confirm Password"}
            id={"confirmPassword"}
            type={"password"}
            placeholder={"Re-Enter password"}
            register={register("confirmPassword", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Should be atleast 6 characters",
              },
              validate: (confirmPassword) => {
                return (
                  confirmPassword === getValues().password ||
                  "Password should match"
                );
              },
            })}
            errors={errors}
          />
        </div>
        <Button type={"login"} disabled={isPending || isTestId}>
          Update password {isPending && <SmallLoader showLoading={false} />}
        </Button>
      </form>
    </div>
  );
}
