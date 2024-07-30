"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row min-h-[300px] w-full">
      <div className="flex flex-col gap-2 mt-4 md:mt-0 justify-center md:w-1/2">
        <h1 className="md:text-3xl text-2xl text-red-500 font-bold">
          Chào mừng đến web xem phim của lenam2509
        </h1>
        <p className="text-lg text-white font-bold md:w-[500px]">
          Đây là trang web xem phim miễn phí, không quảng cáo được xây dựng bởi
          lenam2509 với mục đích học tập và phát triển kỹ năng lập trình
        </p>
      </div>
      <Carousel
        className="md:w-1/2 mt-4 rounded-lg overflow-hidden"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselPrevious className="left-2 z-20 text-black" />
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/thumb.jpg"
              alt="hero-1"
              className="w-full md:h-[400px] h-[200px]"
              width={500}
              height={300}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/thumb2.jpg"
              className="w-full md:h-[400px] h-[200px]"
              alt="hero-2"
              width={500}
              height={300}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="right-2 z-20 text-black" />
      </Carousel>
    </div>
  );
}
