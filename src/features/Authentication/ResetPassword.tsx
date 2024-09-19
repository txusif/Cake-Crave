import Container from "@/ui/Container";
import { useForm } from "react-hook-form";
import useResetPassword from "./useResetPassword";
import FormMessage from "@/ui/FormMessage";
import Logo from "@/ui/Logo";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import SmallLoader from "@/ui/SmallLoader";
import FormLinks from "@/ui/FormLinks";
import { loginBanner01 } from "@/utils/GlobalConst";
import FormCover from "@/ui/FormCover";
import BackgroundCover from "@/ui/BackgroundCover";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const { resetPassword, isPending } = useResetPassword();

  function onSubmit(data: { email: string }) {
    resetPassword(data.email);
  }

  return (
    <>
      <Container>
        <div className="flex h-screen items-center justify-center p-6 shadow-xl lg:p-24">
          <div className="flex bg-White lg:max-w-[1000px]">
            <div className="flex flex-col gap-2 sm:p-12 md:p-16">
              <div className="flex w-[300px] flex-col gap-3">
                <Logo size={"w-[120px]"} />
                <FormMessage
                  title={"Let's get you back"}
                  message={"We will send you a link to reset your password"}
                />
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-6">
                    <Input
                      title={"Email Address"}
                      id={"email"}
                      placeholder={"Enter email address"}
                      register={register("email", {
                        required: "This field is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Provide a valid email address",
                        },
                      })}
                      errors={errors}
                    />
                  </div>
                  <Button type={"login"}>
                    Verify Now{" "}
                    {isPending && <SmallLoader showLoading={false} />}
                  </Button>
                </form>
              </div>
              <FormLinks form="reset" />
            </div>
            <FormCover loginBanner01={loginBanner01} />
          </div>
        </div>
      </Container>
      <BackgroundCover loginBanner01={loginBanner01} />
    </>
  );
}
