"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={partners}
        direction="left"
        speed="fast"
      />
    </div>
  );
}


 const partners = [
      { src: '/partner/casagrand.png', alt: 'Casagrand', width: 110, height: 40 },
      { src: '/partner/sis-logo.png', alt: 'SIS', width: 60, height: 20 },
      { src: '/partner/vgn.png', alt: 'VGN', width: 90, height: 35 },
      { src: '/partner/godrej.png', alt: 'Godrej', width: 70, height: 40 },
      { src: '/partner/roca.png', alt: 'Roca', width: 68, height: 30 },
      { src: '/partner/puravankara.png', alt: 'Puravankara', width: 110, height: 35 },
      { src: '/partner/greenply.png', alt: 'Greenply', width: 60, height: 40 },
    ];
