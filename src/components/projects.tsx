import React from "react";
import { Compare } from "@/components/ui/compare";

export function Projects() {
  return (
    <div id="projects" className="w-full h-full container mx-auto px-6 lg:px-8 2xl:px-12 pt-10 lg:pt-24 font-gtpro">
      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-neutral-900">
          Our Projects
        </h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
          Some of the finest works crafted with love and innovation.
        </p>
      </div>

      {/* Grid layout for all three Compare components */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh]"> */}
      <div className="grid grid-cols-1 gap-6 h-[40vh]">
        {/* First Compare - spans two columns on md+ */}
        <div className="md:col-span-2 max-h-[200px] md:max-h-[300px] lg:max-h-[400px] w-full rounded-3xl">
          <Compare
            firstImage="./compare/compare-1.jpg"
            secondImage="./compare/compare-2.jpg"
            firstImageClassName="object-cover object-center w-full"
            secondImageClassname="object-cover object-center w-full"
            className="h-full w-full rounded-[22px] md:rounded-lg"
            slideMode="drag"
            autoplay={false}
            enableViewAnimation={true}
            viewAnimationDuration={3000}
            animationEndPercentage={35}
          />
        </div>

        {/* Second Compare */}
        {/* <div className="h-full w-full rounded-3xl">
          <Compare
            firstImage="./compare/compare-1.jpg"
            secondImage="./compare/compare-2.jpg"
            firstImageClassName="object-cover object-center w-full"
            secondImageClassname="object-cover object-center w-full"
            className="h-full w-full rounded-[22px] md:rounded-lg"
            slideMode="drag"
            autoplay={false}
            enableViewAnimation={true}
            viewAnimationDuration={2500}
            animationEndPercentage={75}
          />
        </div> */}

        {/* Third Compare */}
        {/* <div className="h-full w-full rounded-3xl">
          <Compare
            firstImage="./compare/compare-1.jpg"
            secondImage="./compare/compare-2.jpg"
            firstImageClassName="object-cover object-center w-full"
            secondImageClassname="object-cover object-center w-full"
            className="h-full w-full rounded-[22px] md:rounded-lg"
            slideMode="drag"
            autoplay={false}
            enableViewAnimation={true}
            viewAnimationDuration={2800}
            animationEndPercentage={75}
          />
        </div> */}
      </div>
    </div>
  );
}
