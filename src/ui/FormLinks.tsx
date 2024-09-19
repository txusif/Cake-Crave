import { useNavigate } from "react-router-dom";

export default function FormLinks({
  form,
}: {
  form: "login" | "signup" | "reset";
}) {
  const navigate = useNavigate();

  if (form === "login")
    return (
      <div className="flex flex-col text-sm text-Grey">
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-semibold text-blue-500 hover:underline"
          >
            Sign Up
          </span>
        </p>
        <p
          className="cursor-pointer hover:text-MediumGrey hover:underline"
          onClick={() => navigate("/reset-password")}
        >
          Forgot Your Password?
        </p>
      </div>
    );

  if (form === "signup" || form === "reset")
    return (
      <div className="flex flex-col gap-1 text-sm text-Grey">
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-blue-500 hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    );
}
