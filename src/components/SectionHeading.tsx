type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${tone}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}
