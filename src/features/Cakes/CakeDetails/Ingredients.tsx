export default function Ingredients({ ingredients }: { ingredients: string }) {
  return (
    <span className="text-center text-xs text-Grey sm:text-left md:text-sm">
      {ingredients}
    </span>
  );
}
