import Image from "next/image";
import Link from "next/link";
import PaginationComponent from "./Pagination";

export type Movie = {
  _id: string;
  name: string;
  origin_name: string;
  content: string;
  type: string;
  episode_current: string;
  episode_total: string;
  showtimes: string;
  status: string;
  time: string;
  thumb_url: string;
  slug: string;
  year: number;
  poster_url: string;
  actor: string[];
  director: string[];
  category: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  country: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  tmdb: {
    type: string;
    id: string;
    season: number;
    vote_average: number;
    vote_count: number;
  };
  modified: {
    time: string;
  };
};

export type MoviesData = {
  items: Movie[];
  pathImage: "https://img.ophim.live/uploads/movies/";
  pagination: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  pageProps: {
    data: {
      items: Movie[];
      titlePage: string;
      APP_DOMAIN_CDN_IMAGE: string;
      params: {
        pagination: {
          totalItems: number;
          totalItemsPerPage: number;
          currentPage: number;
          pageRanges: number;
        };
      };
    };
  };
};

export default async function NewestMovies({
  page,
  searchParams,
}: {
  page: number;
  searchParams: {
    slug: string;
    page: number;
    sort_field: string;
    category: string;
    country: string;
    year: string;
  } | null;
}) {
  const currentPage = page || 1;
  const url =
    "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=" + currentPage;
  const res = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });
  const data: MoviesData = await res.json();
  const movies = data.items;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h1 className=" text-lg md:text-2xl font-bold">Phim mới cập nhật</h1>
      </div>
      <div className="mt-4  grid grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
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
                src={`${data.pathImage}${movie.thumb_url}`}
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
        <PaginationComponent searchParams={null} props={data.pagination} />
      </div>
    </div>
  );
}
