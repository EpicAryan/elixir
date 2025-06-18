import { HeroSection } from "@/components";
import { ImpactSection } from "@/components";
import { StoryGallerySection } from "@/components/storyGallery";
import { WhyChooseUs } from "@/components/whyChooseUs";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <ImpactSection/>
      <StoryGallerySection/>
      <WhyChooseUs/>
    </main>
  );
}
