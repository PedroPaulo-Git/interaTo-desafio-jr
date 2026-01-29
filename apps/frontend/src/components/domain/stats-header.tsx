import { motion } from 'framer-motion'
import { Sparkles, Calendar, Sun, Moon, CloudSun } from 'lucide-react'
import { useTranslation, getLocale } from '@/lib/i18n'

type StatsHeaderProps = {
  userName: string
}

export function StatsHeader({ userName }: StatsHeaderProps) {
  const { t } = useTranslation()
  const locale = getLocale()
  const today = new Date()
  const hour = today.getHours()

  const formattedDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today)

  // Capitalize first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

  // Get greeting based on time
  const getGreeting = () => {
    if (hour < 12) return { text: t('greeting.morning'), icon: Sun, color: 'text-yellow-500' }
    if (hour < 18) return { text: t('greeting.afternoon'), icon: CloudSun, color: 'text-orange-500' }
    return { text: t('greeting.evening'), icon: Moon, color: 'text-indigo-400' }
  }

  const greeting = getGreeting()
  const GreetingIcon = greeting.icon

  return (
    <motion.div
      className="px-10 py-6 bg-linear-to-br from-primary/5 via-secondary to-accent/5 dark:from-background dark:via-background dark:to-background border-b border-transparent dark:border-border/50 text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <GreetingIcon className={`w-5 h-5 ${greeting.color}`} />
            <span className="text-sm font-medium text-muted-foreground">
              {greeting.text}
            </span>
          </motion.div>

          <motion.h1
            className="text-2xl font-bold text-foreground flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {userName}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.span>
          </motion.h1>

          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Calendar className="w-4 h-4" />
            {capitalizedDate}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
