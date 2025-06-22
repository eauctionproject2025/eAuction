'use client';
import Image from 'next/image';
import { useState } from 'react';

const CarouselSlide = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="relative w-full h-[200px] md:h-[400px] rounded overflow-hidden">
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
          <div className="relative z-9 h-full flex items-center">
            <div className="ml-10 text-white max-w-xl">
              {slide.tagline && (
                <p className="uppercase text-sm tracking-widest text-yellow-400">
                  {slide.tagline}
                </p>
              )}
              <h2 className="text-2xl md:text-4xl font-extrabold">{slide.title}</h2>
              <h3 className="text-lg md:text-2xl font-semibold mt-3">{slide.subtitle}</h3>
              <p className="mt-3 text-sm md:text-lg">{slide.description}</p>
              {slide.buttonText && (
                <a href={slide.buttonLink}>
                  <button className="mt-4 px-3 md:px-5 py-1 md:py-2 bg-yellow-500 cursor-pointer text-md md:text-lg text-black font-semibold rounded hover:bg-yellow-600 transition">
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
        className="absolute bg-black/40 w-7 h-9 flex items-center justify-center pb-1.5 top-1/2 left-0 transform -translate-y-1/2 text-4xl text-white hover:text-yellow-400 z-9"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute bg-black/40 w-7 h-9 flex items-center justify-center pb-1.5 top-1/2 right-0 transform -translate-y-1/2 text-4xl text-white hover:text-yellow-400 z-9"
      >
        ›
      </button>
    </div>
  );
};

export default CarouselSlide;
