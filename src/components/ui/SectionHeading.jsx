export default function SectionHeading({ title, subtitle, light = false, className = '' }) {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-14 px-2 ${className}`}>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight ${light ? 'text-white' : 'text-text-primary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-gray-300' : 'text-text-secondary'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
