'use client'

import { motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
  fullScreen?: boolean
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export function LoadingSpinner({ 
  size = 'md', 
  text, 
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <motion.div
        className={cn(
          'relative flex items-center justify-center',
          sizes[size]
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-4 border-primary/20',
            sizes[size]
          )}
        />
        
        {/* Spinning ring */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-4 border-transparent border-t-primary',
            sizes[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Paw icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <PawPrint className={cn('text-primary', iconSizes[size])} />
        </motion.div>
      </motion.div>
      
      {text && (
        <motion.p
          className="text-sm font-medium text-muted-foreground"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}

// Button loading spinner variant
export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('w-5 h-5 border-2 border-current/30 border-t-current rounded-full', className)}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
