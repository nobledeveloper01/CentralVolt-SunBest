import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'bg-secondary hover:bg-secondary-light text-white',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  whatsapp: 'bg-green-500 hover:bg-green-600 text-white',
  white: 'bg-white hover:bg-gray-50 text-charcoal',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', to, href, className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
