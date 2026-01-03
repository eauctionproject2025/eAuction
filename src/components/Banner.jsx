"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

// You can replace these with actual imports or pass them as props
const slides = [
  {
    id: 1,
    title: "Discover Unique Treasures",
    subtitle: "Bid, win, and own exclusive items.",
    buttonText: "Explore Auctions",
    link: "/auctions",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=2070", // Placeholder
    color: "bg-blue-900"
  },
  {
    id: 2,
    title: "Sell Your Collections",
    subtitle: "Reach thousands of buyers instantly.",
    buttonText: "Start Selling",
    link: "/createAuction",
    image: "https://images.unsplash.com/photo-1515544778367-27e1f486576b?auto=format&fit=crop&q=80&w=2072", // Placeholder
    color: "bg-indigo-900"
  },
    {
    id: 3,
    title: "Secure Payments",
    subtitle: "Your funds are safe with our escrow system.",
    buttonText: "Learn More",
    link: "#",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2070", // Placeholder
    color: "bg-green-900"
  }
];

export default function Banner() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
             <div className={`relative w-full h-full flex items-center justify-center ${slide.color}`}>
                {/* Image Background */}
                <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                
                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-3xl">
                     <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
                        {slide.title}
                     </h1>
                     <p className="text-lg md:text-2xl text-gray-100 mb-8 drop-shadow-sm font-light">
                        {slide.subtitle}
                     </p>
                     <Link 
                        href={slide.link} 
                        className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
                     >
                        {slide.buttonText}
                     </Link>
                </div>
             </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
