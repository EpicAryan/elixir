import { HeroSection } from "@/components";
import { ImpactSection } from "@/components";
import { StoryGallerySection } from "@/components";
import { WhyChooseUs } from "@/components";
import { DreamSpaceCta } from "@/components";
import { BuiltToLast } from "@/components";
import { HappyHomes } from "@/components";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <ImpactSection/>
      <StoryGallerySection/>
      <WhyChooseUs/>
      <DreamSpaceCta/>
      <BuiltToLast/>
      <HappyHomes/>
    </main>
  );
}
