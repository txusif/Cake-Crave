type CategoryProps = {
  cuisine: string;
  category: string;
};

export default function Category({ cuisine, category }: CategoryProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-LightGrey p-1">
        <img className="mb-[4px]" src={cuisine} alt={category} />
      </div>
      <span className="text-sm font-medium capitalize text-Grey">
        {category}
      </span>
    </div>
  );
}
