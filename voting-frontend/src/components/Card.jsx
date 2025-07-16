import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Card({ children, className, ...rest }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
      className={clsx(
        'rounded-2xl bg-white shadow-md p-6 transition',
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
