export default function FormMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-DarkGrey">
        {title}
      </h1>
      <p className="text-sm text-Grey">{message}</p>
    </div>
  );
}
