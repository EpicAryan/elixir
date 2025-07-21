// components/projects/filterTabs.tsx
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterTabsProps {
  categories: string[]
  activeFilter: string
  onFilterChange: (category: string) => void
}

export function FilterTabs({ categories, activeFilter, onFilterChange }: FilterTabsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <motion.div 
      className="mb-16"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Mobile Custom Dropdown */}
      <div className="block md:hidden">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gray-500 text-sm">Filter by</span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-[180px] px-3 py-2 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              <span className={cn(
                activeFilter === 'All' ? 'text-gray-500' : 'text-black font-medium'
              )}>
                {activeFilter}
              </span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                isDropdownOpen ? "rotate-180" : ""
              )} />
            </button>
            
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-full mt-1 py-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onFilterChange(category)
                      setIsDropdownOpen(false)
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors",
                      activeFilter === category 
                        ? "text-black font-medium bg-gray-50" 
                        : "text-gray-700"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap gap-2">
        <span className="text-gray-500 text-sm mr-4 self-center">Filter by</span>
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => onFilterChange(category)}
            className={cn(
              "px-4 py-2 text-sm transition-all duration-300 hover:text-black rounded-md",
              activeFilter === category 
                ? "text-black font-medium bg-gray-100" 
                : "text-gray-500 hover:bg-gray-50"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
