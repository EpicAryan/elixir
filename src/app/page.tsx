import { HeroSection } from "@/components";
import { ImpactSection } from "@/components";
import { StoryGallerySection } from "@/components";
import { WhyChooseUs } from "@/components";
import { DreamSpaceCta } from "@/components";
import { BuiltToLast } from "@/components";
import { HappyHomes } from "@/components";
import { Footer } from "@/components";
import { StayInTheKnow } from "@/components";
import Image from "next/image";


export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ImpactSection />
      <StoryGallerySection />

      {/* Decoration Image overlapping bottom of StoryGallerySection and top of WhyChooseUs */}
      <div className="relative">
        <Image
          src="/bg-design.png"
          alt="Design Decoration"
          width={600}
          height={500}
          className="absolute -top-24 sm:-top-32 md:-top-40 right-0 z-10 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[350px] xl:w-[550px] pointer-events-none"
        />
        <WhyChooseUs />
      </div>

      <DreamSpaceCta />
      <BuiltToLast />
      <HappyHomes />
      <StayInTheKnow />
      <Footer />
    </main>
  );
}
