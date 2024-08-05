import Filter from "@/components/Filter";
import { theloais } from "@/components/HeaderDropdownLoai";
import { quocgia } from "@/components/HeaderDropdownQuocGia";
import { MoviesData } from "@/components/NewestMovies";
import PaginationComponent from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";

type Params = {
  slug: string[];
};

type searchParams = {
  slug: string;
  page: number;
  sort_field: string;
  category: string;
  country: string;
  year: string;
};

const getMovies = async (
  slug: string,
  page: number,
  sort_field: string,
  category: string,
  country: string
) => {
  const url = `https://ophim17.cc/_next/data/j4bBHnWv9JD18kNQ3njRH/danh-sach/${slug}.json?slug=${slug}&sort_field=${
    sort_field || "modified.time"
  }&category=${category || ""}&country=${slug || ""}&year=&page=${page || 1}`;
  const res = await fetch(url, { cache: "no-store" });
  const data: MoviesData = await res.json();
  return data.pageProps.data;
};

const getTheLoai = async () => {
  const url = `https://ophim1.com/the-loai`;
  const res = await fetch(url);
  const data: theloais[] = await res.json();
  return data;
};

const getQuocGia = async () => {
  const url = `https://ophim1.com/quoc-gia`;
  const res = await fetch(url);
  const data: quocgia[] = await res.json();
  return data;
};

export default async function page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: searchParams;
}) {
  const slug = params.slug[0];

  const [
    {
      items,
      titlePage,
      params: { pagination },
      APP_DOMAIN_CDN_IMAGE,
    },
    theloais,
    quocgias,
  ] = await Promise.all([
    getMovies(
      slug,
      searchParams.page,
      searchParams.sort_field,
      searchParams.category,
      searchParams.country
    ),
    getTheLoai(),
    getQuocGia(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <span>Lọc phim:</span>
        <Filter theloais={theloais} quocgias={quocgias} />
      </div>
      <h1 className="font-bold text-3xl mt-4">{titlePage}</h1>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((movie) => (
          <div className="md:w-[250px] w-[100px] relative" key={movie._id}>
            <Link
              href={`/detail/${movie.slug}`}
              className="flex items-center flex-col"
            >
              <div className="absolute rounded font-bold p-1 md:p-2 left-2 top-28 md:top-2 text-sm bg-black/60 text-white">
                {movie.tmdb.type}
              </div>
              <div className="absolute   right-1 top-1 md:top-2 bg-black rounded-full">
                <p className="text-yellow-500 p-2 text-xs md:text-sm flex items-center">
                  {movie.tmdb.vote_average.toFixed(1)}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-3 md:size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </div>
              <Image
                src={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.thumb_url}`}
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
        <PaginationComponent searchParams={searchParams} props={pagination} />
      </div>
    </div>
  );
}
