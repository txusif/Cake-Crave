export default function NoSearchData() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-[200px]">
        <img
          src="https://yyfjumfmwgnvczjziqao.supabase.co/storage/v1/object/public/banners/noData.png"
          alt="no data"
        />
      </div>
      <p className="text-sm text-MediumGrey">
        We&apos;re sorry. We were not able to find a match :(
      </p>
    </div>
  );
}
