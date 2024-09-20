import { Link } from "react-router-dom";

export default function Developer() {
  return (
    <div className="fixed bottom-0 w-full max-w-max border-t-[1px] border-Grey/40 bg-White">
      <div className="flex flex-wrap items-center justify-center gap-x-24 gap-y-0 px-2 py-1 text-[8px] sm:justify-between sm:px-10 md:px-24">
        <div>
          <span className="text-Grey">Designed and Developed: </span>{" "}
          <span className="font-semibold underline hover:text-Orange">
            <Link
              to="https://www.linkedin.com/in/txusif/"
              target="_blank"
              rel="noreferrer"
            >
              Toushief Ansari
            </Link>
          </span>
        </div>
        <span className="text-Grey">Last Updated | 20 09 2024</span>
      </div>
    </div>
  );
}
