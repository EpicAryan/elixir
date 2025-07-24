// components/steps/PackageSelectionStep.tsx
import React from 'react'
import Image from 'next/image'
import { FormData } from '../../types/stepper'

const packages = [
  {
    id: 'Basic' as const,
    title: 'Basic',
    description: 'Affordable, essential interior solutions.',
    features: ['Essential styling', 'Budget-friendly', 'Standard accessories'],
    image: '/hero.png',
  },
  {
    id: 'Premium' as const,
    title: 'Premium',
    description: 'Mid-range designs with extra features.',
    features: ['Upgraded finishes', 'More accessories', 'Stylish layouts'],
    image: '/hero.png',
  },
  {
    id: 'Ultra Premium' as const,
    title: 'Ultra Premium',
    description: 'Top-tier luxury interiors.',
    features: ['Luxury materials', 'High-end accessories', 'Exclusive designs'],
    image: '/hero.png',
  },
]

export default function PackageSelectionStep({
  formData,
  setFormData,
}: {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}) {
  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-sm sm:text-xl font-bold text-zinc-900">Pick your package</h2>
      </div>
      <div className="grid sm:grid-cols-2 overflow-y-auto gap-6 px-8 sm:px-0 md:px-8">
        {packages.map((pkg) => {
          const isSelected = formData.package === pkg.id
          return (
            <div
              key={pkg.id}
              className={`border rounded-xl p-4 cursor-pointer shadow-sm max-w-60 sm:max-w-full justify-self-center
                ${isSelected ? 'border-orange-500 bg-orange-50'
                 : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, package: pkg.id }))
              }
            >
              <div className="flex items-center mb-2">
                <div className={`size-4 sm:size-5 rounded-full border-2 mr-3
                  ${isSelected ? 'border-orange-600 bg-orange-600' : 'border-gray-300'}`}>
                  {isSelected && <div className="size-1.5 sm:size-2 bg-white rounded-full mx-auto mt-[3px] sm:mt-1" />}
                </div>
                <h3 className="text-sm sm:text-base font-semibold">{pkg.title}</h3>
              </div>
              <p className="text-gray-600 text-[11px] sm:text-sm mb-4">{pkg.description}</p>
              <div className="w-full h-32 sm:h-40 overflow-hidden mb-4 rounded-xl">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  width={400}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-2">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-center text-xs sm:text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1..."
                        clipRule="evenodd"
                      />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
