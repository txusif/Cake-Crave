export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-max">{children}</div>;
}
