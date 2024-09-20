import BackgroundCover from "@/ui/BackgroundCover";
import Button from "@/ui/Button";
import Container from "@/ui/Container";
import FormCover from "@/ui/FormCover";
import FormLinks from "@/ui/FormLinks";
import FormMessage from "@/ui/FormMessage";
import Input from "@/ui/Input";
import Logo from "@/ui/Logo";
import SmallLoader from "@/ui/SmallLoader";
import signupBanner from "/assets/banners/signup-banner.png";
import { useForm } from "react-hook-form";
import useSignUp from "./useSignUp";

export type SignUpDataType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpDataType>();
  const { signUp, isPending } = useSignUp();

  function onSubmit({ fullName, email, password }: SignUpDataType) {
    signUp({ fullName, email, password });
  }

  return (
    <>
      <Container>
        <div className="flex h-screen items-center justify-center overflow-y-auto p-6 shadow-xl lg:p-24">
          <div className="flex bg-White lg:max-w-[1000px]">
            <div className="flex flex-col gap-2 sm:p-12 md:p-16">
              <div className="flex flex-col gap-3 sm:w-[300px] md:gap-4">
                <div className="flex flex-col gap-3 md:gap-6">
                  <Logo size="w-[120px]" />
                  <FormMessage
                    title={"Feast Mode 🤤"}
                    message={"Your Passport to Tasty Discoveries Starts Here!"}
                  />
                </div>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-3">
                    <Input
                      title={"Full Name"}
                      id={"fullName"}
                      placeholder={"Your Full Name"}
                      register={register("fullName", {
                        required: "This field is required",
                      })}
                      errors={errors}
                    />
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
                  <Button type={"login"}>
                    Sign Up {isPending && <SmallLoader showLoading={false} />}
                  </Button>
                </form>
              </div>
              <FormLinks form="signup" />
            </div>
            <FormCover bannerImage={signupBanner} />
          </div>
        </div>
      </Container>
      <BackgroundCover coverBanner={signupBanner} />
    </>
  );
}
