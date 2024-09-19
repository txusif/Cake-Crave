import Banner from "@/features/Banner";
import Cakes from "@/features/Cakes/Cakes";
import Filter from "@/features/Filter";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Banner />
      <Filter />
      <Cakes />
    </main>
  );
}
