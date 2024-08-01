import HeroSection from "@/components/HeroSection";
import NewestMovies from "@/components/NewestMovies";

export default function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  return (
    <>
      <HeroSection />
      <NewestMovies page={searchParams.page} searchParams={null} />
    </>
  );
}
