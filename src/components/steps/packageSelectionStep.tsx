import React from 'react';
import Image from 'next/image';
import { FormData } from '../../types/stepper';

interface PackageSelectionStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function PackageSelectionStep({ formData, setFormData }: PackageSelectionStepProps) {
  const packages = [
    {
      id: 'essentials',
      title: 'Essentials (₹₹)',
      description: "A range of essential home interior solutions that's perfect for all your needs.",
      features: ['Affordable pricing', 'Convenient designs', 'Basic accessories'],
      image: '/hero.png',
    },
    {
      id: 'premium',
      title: 'Premium (₹₹₹)',
      description: 'Superior home interior solutions that will take your interiors to the next level.',
      features: ['Mid-range pricing', 'Premium designs', 'Wide range of accessories'],
      image: '/hero.png',
    },
    {
      id: 'luxury',
      title: 'Luxury (₹₹₹₹)',
      description: 'Ultimate luxury home interior solutions for the most discerning tastes.',
      features: ['Premium pricing', 'Luxury designs', 'Exclusive accessories'],
      image: '/hero.png',
    },
  ];

  return (
    <div className="flex flex-col h-full w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-zinc-900 font-gtpro">Pick your package</h2>
      </div>

      {/* Scrollable section grows to fill available space */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 scrollbar-hide">
        <div className="flex flex-col gap-4 max-w-md mx-auto pb-6">
          {packages.map((pkg) => {
            const isSelected = formData.package === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`w-full border rounded-xl p-4 cursor-pointer transition-all shadow-sm
                  ${isSelected ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
                `}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, package: pkg.id as FormData['package'] }))
                }
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3
                      ${isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300'}
                    `}
                  >
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />}
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">{pkg.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 text-left">{pkg.description}</p>

                {/* Image */}
                <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={400}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
