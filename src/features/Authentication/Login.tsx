import BackgroundCover from "@/ui/BackgroundCover";
import Button from "@/ui/Button";
import Container from "@/ui/Container";
import FormCover from "@/ui/FormCover";
import FormLinks from "@/ui/FormLinks";
import FormMessage from "@/ui/FormMessage";
import Input from "@/ui/Input";
import Logo from "@/ui/Logo";
import SmallLoader from "@/ui/SmallLoader";
import loginBanner from "/assets/banners/login-banner.png";
import { useForm } from "react-hook-form";
import { LoginDataType, useLogin } from "./useLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "heytxusif@gmail.com",
      password: "12345678",
    },
  });
  const { login, isPending: isLogging } = useLogin();

  function onSubmit(data: LoginDataType) {
    login(data, {
      onError: () => {
        reset({
          email: "",
          password: "",
        });
      },
    });
  }

  return (
    <>
      <Container>
        <div className="flex h-screen items-center justify-center p-6 shadow-xl lg:p-24">
          <div className="flex bg-White lg:max-w-[1000px]">
            <div className="flex flex-col gap-2 sm:p-12 md:p-16">
              <div className="flex flex-col gap-3 sm:w-[300px] md:gap-4">
                <div className="flex flex-col gap-3">
                  <Logo size="w-[120px]" />
                  <FormMessage
                    title={"Savor the Moment"}
                    message={
                      "Sign in now to continue your culinary journey with us"
                    }
                  />
                </div>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-3 md:gap-4">
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
                          message: "Should contain atleast 6 characters",
                        },
                      })}
                      errors={errors}
                    />
                  </div>
                  <Button type={"login"}>
                    Sign In {isLogging && <SmallLoader showLoading={false} />}
                  </Button>
                </form>
              </div>
              <FormLinks form="login" />
            </div>
            <FormCover bannerImage={loginBanner} />
          </div>
        </div>
      </Container>
      <BackgroundCover coverBanner={loginBanner} />
    </>
  );
};

export default Login;
