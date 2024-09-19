import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }
  return (
    <div className="flex h-screen max-w-max items-center justify-center text-3xl font-semibold">
      <div className="flex flex-col gap-4">
        <p>Page not found</p>
        <button
          className="rounded-md outline outline-Grey"
          onClick={handleClick}
        >
          Go back
        </button>
      </div>
    </div>
  );
}
