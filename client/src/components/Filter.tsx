"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type props = {
  theloais: { _id: string; name: string; slug: string }[];
  quocgias: { _id: string; name: string; slug: string }[];
};

const danhsach = [
  { name: "Phim lẻ", slug: "phim-le" },
  { name: "Phim bộ", slug: "phim-bo" },
  { name: "Phim mới", slug: "phim-moi" },
  { name: "TV Shows", slug: "tv-shows" },
  { name: "Hoạt hình", slug: "hoat-hinh" },
];

export default function Filter({ theloais, quocgias }: props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("sort_field", value);
    router.push(`${pathname}?${sp.toString()}`);
  };
  const handleCategory = (value: string) => {
    const sp = new URLSearchParams(searchParams);
    if (value === "all") {
      sp.set("category", "");
    } else {
      sp.set("category", value);
    }
    return router.push(`${pathname}?${sp.toString()}`);
  };
  const handleCountry = (value: string) => {
    const sp = new URLSearchParams(searchParams);
    if (value === "all") {
      sp.set("country", "");
    } else {
      sp.set("country", value);
    }
    return router.push(`${pathname}?${sp.toString()}`);
  };
  const handleDanhsach = (value: string) => {
    router.replace(`${value}`);
  };
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Select onValueChange={handleSort} defaultValue="modified.time">
        <SelectTrigger className="md:w-[180px] w-[140px] bg-[rgb(51,65,85)] text-white ">
          <SelectValue placeholder="Thời gian cập nhật" />
        </SelectTrigger>
        <SelectContent className="bg-[rgb(51,65,85)] text-white">
          <SelectItem value="modified.time">thời gian cập nhật</SelectItem>
          <SelectItem value="_id">thời gian đăng</SelectItem>
          <SelectItem value="year">năm sản xuất</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleCategory}>
        <SelectTrigger className="md:w-[180px] w-[140px] bg-[rgb(51,65,85)] text-white ">
          <SelectValue placeholder="Thể loại" />
        </SelectTrigger>
        <SelectContent className="bg-[rgb(51,65,85)] text-white">
          <SelectItem value="all">Tất cả</SelectItem>
          {theloais.map((item) => (
            <SelectItem key={item._id} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleCountry}>
        <SelectTrigger className="md:w-[180px] w-[140px] bg-[rgb(51,65,85)] text-white ">
          <SelectValue placeholder="Quốc gia" />
        </SelectTrigger>
        <SelectContent className="bg-[rgb(51,65,85)] text-white">
          <SelectItem value="all">Tất cả</SelectItem>
          {quocgias.map((item) => (
            <SelectItem key={item._id} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleDanhsach}>
        <SelectTrigger className="md:w-[180px] w-[140px] bg-[rgb(51,65,85)] text-white ">
          <SelectValue placeholder="Danh sách" />
        </SelectTrigger>
        <SelectContent className="bg-[rgb(51,65,85)] text-white">
          {danhsach.map((item) => (
            <SelectItem key={item.slug} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
