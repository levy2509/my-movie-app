import { Movie } from "@/components/NewestMovies";
import Image from "next/image";
import Link from "next/link";

export type episodes = [
  {
    server_name: string;
    server_data: [
      {
        name: string;
        slug: string;
        filename: string;
        link_embed: string;
        link_m3u8: string;
      }
    ];
  }
];

export default async function DetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const url = `https://ophim1.com/phim/${params.slug}`;
  const res = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });
  const data = await res.json();
  const movie: Movie = data.movie;
  const episodes: episodes = data.episodes;

  return (
    <div className="flex md:flex-row flex-col pt-4 gap-4">
      <Image
        src={movie.thumb_url}
        alt={movie.name}
        width={500}
        height={300}
        className="w-96 md:h-[600px] rounded-lg"
      />
      <div className="w-full flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold text-red-400">{movie.name}</h1>
        <p className="text-sm text-gray-500">{movie.modified.time}</p>
        <div dangerouslySetInnerHTML={{ __html: movie.content }}></div>
        <div dangerouslySetInnerHTML={{ __html: movie.showtimes }}></div>
        <div className="text-lg">Thời gian: {movie.time}</div>
        <div className="text-lg">Trạng thái: {movie.episode_current}</div>
        <div className="text-lg">Tổng số tập: {movie.episode_total}</div>
        <div className="flex flex-wrap gap-4">
          Thể loại:
          {movie.category.map((category) => (
            <span key={category.id} className="text-blue-300 font-bold">
              {category.name}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          Quốc gia:
          {movie.country.map((country) => (
            <span key={country.id} className="text-red-300 font-bold">
              {country.name}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          Đạo diễn:
          {movie.director.map((director, i) => (
            <span key={i} className="text-red-300 font-bold">
              {director}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          Diễn viên:
          {movie.actor.map((actor, i) => (
            <span key={i} className="text-red-300 font-bold">
              {actor}
            </span>
          ))}
        </div>
        <div className="text-2xl font-bold">Danh sách tập:</div>
        <div className="w-full h-[200px] overflow-y-scroll">
          {episodes.map((episode, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="text-lg font-bold">{episode.server_name}</div>
              <div className="flex md:flex-wrap flex-col md:flex-row gap-4">
                {episode.server_data.map((server, j) => (
                  <Link
                    key={j}
                    href={server.link_embed}
                    className="text-blue-300 font-bold p-2 bg-slate-200/10 rounded"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {server.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
