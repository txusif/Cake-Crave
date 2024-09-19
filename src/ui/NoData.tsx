export default function NoData() {
  return (
    <div className="flex w-[200px] flex-col items-center gap-2 md:w-[300px]">
      <img
        className="w-full"
        src="https://yyfjumfmwgnvczjziqao.supabase.co/storage/v1/object/public/banners/empty.png?t=2024-02-01T17%3A16%3A36.910Z"
        alt="empty cart"
      />
      <p className="text-center text-sm md:text-base">
        <span className="text-xl font-semibold md:text-2xl">"Uh-oh!</span>
        <br /> Our cart is on a diet. It needs some items to feast on. What will
        you add today?"
      </p>
    </div>
  );
}
