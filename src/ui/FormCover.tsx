export default function FormCover({
  loginBanner01,
}: {
  loginBanner01: string;
}) {
  return (
    <div className="box-content hidden bg-red-500 sm:block">
      <img className="h-full object-cover" src={loginBanner01} alt="banner" />
    </div>
  );
}
