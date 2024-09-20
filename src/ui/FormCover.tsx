export default function FormCover({ bannerImage }: { bannerImage: string }) {
  return (
    <div className="box-content hidden bg-red-500 sm:block">
      <img className="h-full object-cover" src={bannerImage} alt="banner" />
    </div>
  );
}
