import Image from 'next/image';
import React from 'react';

const Projects = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <Image
        src="/project.jpg"
        alt="Project background"
        fill
        className="object-cover"
        priority // Optional: loads early
      />
      {/* Optional: Add overlay or content here */}
      <div className="absolute inset-0 flex items-center justify-center text-neutral-200 text-2xl">
        Our Projects
      </div>
    </div>
  );
};

export { Projects };
