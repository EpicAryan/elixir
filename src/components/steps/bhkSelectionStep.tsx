import React, { useState } from 'react'
import { FormData } from '../../types/stepper'

interface BHKSelectionStepProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

export default function BHKSelectionStep({ formData, setFormData }: BHKSelectionStepProps) {
  const [expandedBHK, setExpandedBHK] = useState<string | null>(null)

  const bhkOptions = [
    { value: '1', label: '1 BHK', hasSize: false },
    { value: '2', label: '2 BHK', hasSize: true },
    { value: '3', label: '3 BHK', hasSize: true },
    { value: '4', label: '4 BHK', hasSize: true },
    { value: '5+', label: '5 BHK+', hasSize: false },
  ]

  const sizeOptions = [
    { value: 'small', label: 'Small', description: 'Below 1200 sq ft' },
    { value: 'large', label: 'Large', description: 'Above 1200 sq ft' },
  ]

  const handleBHKSelection = (bhkValue: string) => {
    setFormData((prev) => {
      const updated = { ...prev, bhkType: bhkValue }
      if (!updated.bhkSizes) updated.bhkSizes = {}
      if (['2', '3', '4'].includes(bhkValue) && !updated.bhkSizes[bhkValue]) {
        updated.bhkSizes[bhkValue] = 'small'
      }
      return updated
    })

    const option = bhkOptions.find((opt) => opt.value === bhkValue)
    if (option?.hasSize) {
      setExpandedBHK(expandedBHK === bhkValue ? null : bhkValue)
    } else {
      setExpandedBHK(null)
    }
  }

  const handleSizeSelection = (bhkValue: string, size: 'small' | 'large') => {
    setFormData((prev) => ({
      ...prev,
      bhkSizes: {
        ...prev.bhkSizes,
        [bhkValue]: size,
      },
    }))
  }

  const isSelected = (bhk: string) => formData.bhkType === bhk
  const isExpanded = (bhk: string) => expandedBHK === bhk

  return (
    <div className="w-full max-w-sm mx-auto text-center font-gtpro">
      <h2 className="text-xl font-semibold text-zinc-900 mb-2">Select your BHK type</h2>
      <p className="text-sm text-gray-600 mb-6">
        To know more about this, <span className="text-red-500 cursor-pointer">click here</span>
      </p>

      <div className="space-y-3 ">
        {bhkOptions.map((option) => {
          const selected = isSelected(option.value)
          const expanded = isExpanded(option.value)

          return (
            <div key={option.value} >
              {/* Main BHK Card */}
              <div
                onClick={() => handleBHKSelection(option.value)}
                className={`rounded-lg border p-3 cursor-pointer transition-all shadow-sm
                ${selected ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Custom Radio Dot */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selected ? 'border-red-500 bg-red-500' : 'border-gray-300'}
                    `}
                    >
                      {selected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-base font-medium">{option.label}</span>
                  </div>

                  {option.hasSize && (
                    <svg
                      className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Sub Options */}
              {option.hasSize && expanded && (
                <div className="mt-2 animate-in slide-in-from-top-2 duration-200 ">
                  <div className="grid grid-cols-2 gap-3">
                    {sizeOptions.map((s) => {
                      const isSizeSelected = formData.bhkSizes?.[option.value] === s.value

                      return (
                        <div
                          key={s.value}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSizeSelection(option.value, s.value as 'small' | 'large')
                          }}
                          className={`rounded-lg border p-3 text-left cursor-pointer transition-all
                            ${
                              isSizeSelected
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                ${
                                  isSizeSelected
                                    ? 'border-red-400 bg-red-400'
                                    : 'border-gray-300'
                                }`}
                            >
                              {isSizeSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{s.label}</p>
                              <p className="text-xs text-gray-500">{s.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
