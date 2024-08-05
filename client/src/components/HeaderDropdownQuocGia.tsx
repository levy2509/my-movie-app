import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderDropdownProps = {
  showquocgia: boolean;
};

export type quocgia = {
  _id: string;
  name: string;
  slug: string;
};

export default function HeaderDropdownQuocGia({
  showquocgia,
}: HeaderDropdownProps) {
  const [quocgias, setquocgia] = useState<quocgia[]>([]);
  const fetchQuocGia = async () => {
    const res = await fetch("https://ophim1.com/quoc-gia");
    const data = await res.json();
    setquocgia(data);
  };
  useEffect(() => {
    fetchQuocGia();
  }, []);

  return (
    <div
      className={`header_dropdown z-[100] fade-in ${
        showquocgia ? "grid" : "hidden"
      }`}
    >
      {quocgias.map((quocgia, index) => (
        <Link
          key={index}
          className="p-2 rounded hover:bg-purple-400 h-fit "
          href={"/quocgia/" + quocgia.slug}
        >
          {quocgia.name}
        </Link>
      ))}
    </div>
  );
}
