import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const danhsach = [
  { name: "Phim lẻ", slug: "phim-le" },
  { name: "Phim bộ", slug: "phim-bo" },
  { name: "Hoạt hình", slug: "hoat-hinh" },
  { name: "TV Shows", slug: "tv-shows" },
  { name: "Phim trọn bộ", slug: "phim-bo-hoan-thanh" },
];

type props = {
  theloais: { _id: string; name: string; slug: string }[];
  quocgias: { _id: string; name: string; slug: string }[];
};

export default function Filter({ theloais, quocgias }: props) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Select>
        <SelectTrigger className="md:w-[180px] w-[140px] bg-[rgb(51,65,85)] text-white ">
          <SelectValue placeholder="Thời gian cập nhật" />
        </SelectTrigger>
        <SelectContent className="bg-[rgb(51,65,85)] text-white">
          <SelectItem value="modified.time">thời gian cập nhật</SelectItem>
          <SelectItem value="_id">thời gian đăng</SelectItem>
          <SelectItem value="year">năm sản xuất</SelectItem>
        </SelectContent>
      </Select>

      <Select>
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

      <Select>
        <SelectTrigger className="md:w-[180px] w-[140px] bg-[rgb(51,65,85)] text-white ">
          <SelectValue placeholder="Thể loại" />
        </SelectTrigger>
        <SelectContent className="bg-[rgb(51,65,85)] text-white">
          {theloais.map((item) => (
            <SelectItem key={item._id} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="md:w-[180px] w-[140px] bg-[rgb(51,65,85)] text-white ">
          <SelectValue placeholder="Quốc gia" />
        </SelectTrigger>
        <SelectContent className="bg-[rgb(51,65,85)] text-white">
          {quocgias.map((item) => (
            <SelectItem key={item._id} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
