"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import HeaderDropdownLoai from "./HeaderDropdownLoai";
import HeaderDropdownQuocGia from "./HeaderDropdownQuocGia";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const [showloai, setShowloai] = useState(false);
  const [showquocgia, setShowquocgia] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    // console.log(search);
    if (search.trim() === "") return;
    const sp = new URLSearchParams(searchParams);
    const searchPath = `/timkiem`;
    sp.set("keyword", search);
    sp.delete("page");
    router.replace(`${searchPath}?${sp.toString()}`);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !(e.target as HTMLElement).closest(".header_dropdown") &&
        !(e.target as HTMLElement).closest(".relative")
      ) {
        setShowloai(false);
        setShowquocgia(false);
      }
    });
  }, []);

  return (
    <header className="text-white flex px-4 md:px-8 py-4  z-50 justify-between items-center border-b border-b-slate-300/10">
      <div className="flex gap-8 items-center">
        <Link href={"/"} className="w-[100px] lg:w-fit">
          <Image
            src={"/logo.png"}
            width={200}
            height={100}
            priority
            alt="logo"
            className="w-full h-full object-cover"
          />
        </Link>
        <form onSubmit={submitSearch} className="relative">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="search_input w-36 md:w-full"
            placeholder="Tìm kiếm phim..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 hidden md:block absolute right-2 top-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </form>
      </div>
      <div className="hidden xl:flex items-center gap-8">
        <Link className="hover:text-blue-300" href={"/danhsach/phim-bo"}>
          Phim bộ
        </Link>
        <Link className="hover:text-blue-300" href={"/danhsach/phim-le"}>
          Phim lẻ
        </Link>
        <Link className="hover:text-blue-300" href={"/danhsach/tv-shows"}>
          Shows
        </Link>
        <Link className="hover:text-blue-300" href={"/danhsach/hoat-hinh"}>
          Hoạt hình
        </Link>
        <div
          onClick={() => (setShowloai(!showloai), setShowquocgia(false))}
          className="cursor-pointer flex gap-2 items-center relative"
        >
          Thể loại
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-[rgb(167,139,250)] font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <HeaderDropdownLoai showloai={showloai} />
        </div>
        <div
          onClick={() => (setShowquocgia(!showquocgia), setShowloai(false))}
          className="cursor-pointer flex gap-2 items-center relative"
        >
          Quốc gia
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-[rgb(167,139,250)] font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <HeaderDropdownQuocGia showquocgia={showquocgia} />
        </div>
        <Link className="text-red-500 font-bold" href={"/"}>
          Subteam
        </Link>
      </div>

      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </SheetTrigger>
          <SheetContent className="bg-slate-500 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <SheetDescription className="flex flex-col gap-4 text-white font-bold mt-4">
              <Link href={"/danhsach/phim-bo"}>Phim bộ</Link>
              <Link href={"/danhsach/phim-le"}>Phim lẻ</Link>
              <Link href={"/danhsach/tv-shows"}>Shows</Link>
              <Link href={"/danhsach/hoat-hinh"}>Hoạt hình</Link>
              <Link href={"/"}>Subteam</Link>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
