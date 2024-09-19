export default function PositionFixed({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-max items-center justify-center">
      <div className="pointer-events-none fixed top-0 z-20 w-full overflow-hidden">
        <div className="pointer-events-none h-screen">{children}</div>
      </div>
    </div>
  );
}
