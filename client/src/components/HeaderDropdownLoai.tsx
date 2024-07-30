import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderDropdownProps = {
  showloai: boolean;
};

type theloais = {
  _id: string;
  name: string;
  slug: string;
};

export default function HeaderDropdownLoai({ showloai }: HeaderDropdownProps) {
  const [theloais, setTheloais] = useState<theloais[]>([]);
  const fetchQuocGia = async () => {
    const res = await fetch("https://ophim1.com/the-loai");
    const data = await res.json();
    setTheloais(data);
  };
  useEffect(() => {
    fetchQuocGia();
  }, []);

  return (
    <div
      className={`header_dropdown z-[100] fade-in ${
        showloai ? "grid" : "hidden"
      }`}
    >
      {theloais.map((theloai, index) => (
        <Link
          key={index}
          className="p-2 rounded hover:bg-purple-400 h-fit "
          href={"/the-loai/" + theloai.slug}
        >
          {theloai.name}
        </Link>
      ))}
    </div>
  );
}
