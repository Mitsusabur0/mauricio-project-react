import { ArrowIcon } from './Icons'

type Publication = {
  author: string
  date: string
  title: string
  description: string
  image: string
  imagePosition: string
}

export function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  return (
    <article className="publication-card">
      <div className="publication-image-wrap">
        <img
          src={publication.image}
          style={{ objectPosition: publication.imagePosition }}
          alt={`Imagen editorial referencial para ${publication.title}`}
        />
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="publication-content">
        <div className="publication-meta">
          <span>{publication.author}</span>
          <time>{publication.date}</time>
        </div>
        <h2>{publication.title}</h2>
        <p>{publication.description}</p>
        <button type="button" className="text-link" aria-label={`Leer más sobre ${publication.title}`}>
          Leer más <ArrowIcon />
        </button>
      </div>
    </article>
  )
}
