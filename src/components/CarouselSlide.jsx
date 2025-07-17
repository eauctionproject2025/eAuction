'use client';
import Image from 'next/image';
import { useState } from 'react';

const CarouselSlide = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] rounded overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-9' : 'opacity-0 z-0'
          }`}
        >
          {/* Image background */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Text overlay */}
          <div className="relative w-[55%] z-9 h-full flex items-center">
            <div className="ml-7 md:ml-10 text-white flex flex-col justify-center align-middle max-w-xl">
              {slide.tagline && (
                <p className="uppercase text-sm tracking-widest text-yellow-400">
                  {slide.tagline}
                </p>
              )}
              <h2 className="text-xl md:text-4xl font-extrabold">{slide.title}</h2>
              <h3 className="text-md md:text-2xl font-semibold mt-1 md:mt-3">{slide.subtitle}</h3>
              <p className="mt-1 mb-2 md:mt-3 text-sm md:text-lg  md:mb-4">{slide.description}</p>
              {slide.buttonText && (
                <a href={slide.buttonLink}>
                  <button className="px-1.5 md:px-5 py-0.5 md:py-2 bg-yellow-500 cursor-pointer text-[12px] md:text-lg text-black font-semibold rounded hover:bg-yellow-600 transition">
                    {slide.buttonText}
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute bg-black/40 w-5 md:w-7 h-5 text-[24px] md:text-3xl p-1 md:h-9 flex items-center justify-center pb-1.5 top-1/2 left-0 transform -translate-y-1/2 text-4xl text-white hover:text-yellow-400 z-9"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute bg-black/40 w-5 md:w-7 h-5 text-[24px] md:text-3xl p-1 md:h-9 flex items-center justify-center pb-1.5 top-1/2 right-0 transform -translate-y-1/2 text-4xl text-white hover:text-yellow-400 z-9"
      >
        ›
      </button>
    </div>
  );
};

export default CarouselSlide;
