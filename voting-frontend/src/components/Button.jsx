import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',   // primary | secondary | danger
  type = 'button',
  className,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const styles = {
    primary:   'bg-primary  text-white hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-secondary text-gray-800 hover:bg-secondary/90 focus:ring-secondary',
    danger:    'bg-accent    text-white hover:bg-accent/90   focus:ring-accent',
  }

  return (
    <button
      type={type}
      className={clsx(base, styles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
