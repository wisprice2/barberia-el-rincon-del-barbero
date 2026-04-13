import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: React.ReactNode[];
  autoplay?: boolean;
  interval?: number;
}

export const Carousel = ({ items, autoplay = true, interval = 5000 }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, items.length]);

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-[#C87A3F]/20 hover:bg-[#C87A3F]/40 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} className="text-[#C87A3F]" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-[#C87A3F]/20 hover:bg-[#C87A3F]/40 transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} className="text-[#C87A3F]" />
      </button>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? 'w-8 bg-[#C87A3F]'
                : 'w-2 bg-[#C87A3F]/30 hover:bg-[#C87A3F]/50'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
