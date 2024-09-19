export default function Description({ description }: { description: string }) {
  return (
    <p className="text-center text-sm text-MediumGrey sm:text-left md:text-base">
      {description}
    </p>
  );
}
