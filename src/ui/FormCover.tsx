export default function FormCover({ bannerImage }: { bannerImage: string }) {
  return (
    <div className="box-content hidden sm:block">
      <img className="invisible h-full" src={bannerImage} alt="banner" />
    </div>
  );
}
