// components/projects/loadMoreButton.tsx
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface LoadMoreButtonProps {
  onClick: () => void
  loading: boolean
}

export function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <motion.div 
      className="text-center mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={onClick}
        disabled={loading}
        className="px-8 py-5 bg-[#F86642] hover:bg-orange-600 shadow-[2px_10px_30px_-6px_#F86642]/60 rounded-lg cursor-pointer active:scale-102 font-gtpro duration-300 lg:text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          'Load more'
        )}
      </Button>
    </motion.div>
  )
}
