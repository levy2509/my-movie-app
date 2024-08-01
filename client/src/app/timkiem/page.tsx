import { MoviesData } from "@/components/NewestMovies";
import PaginationComponent from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";

export default async function TimKiemPage({
  searchParams,
}: {
  searchParams: { keyword: string; page: number };
}) {
  const url = `https://ophim17.cc/_next/data/j4bBHnWv9JD18kNQ3njRH/tim-kiem.json?keyword=${
    searchParams.keyword || ""
  }&page=${searchParams.page || 1}`;
  const res = await fetch(url, { cache: "no-cache" });
  const data: MoviesData = await res.json();
  const movies = data.pageProps.data.items;
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">{data.pageProps.data.titlePage}</h1>
      <div className="mt-4  grid grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div className="md:w-[250px] w-[100px] relative" key={movie._id}>
            <Link
              href={`/detail/${movie.slug}`}
              className="flex items-center flex-col"
            >
              <Image
                src={`${data.pageProps.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.thumb_url}`}
                alt={movie.name}
                width={200}
                height={300}
                className="rounded-lg md:h-96 h-40 w-60"
              />
              <h2 className="mt-2 text-center text-sm md:text-base font-medium">
                {movie.name}
              </h2>
              <p className="text-center text-xs md:text-sm text-gray-500">
                {movie.year}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <PaginationComponent
          searchParams={
            searchParams.keyword ? { keyword: searchParams.keyword } : null
          }
          props={data.pageProps.data.params.pagination}
        />
      </div>
    </div>
  );
}
