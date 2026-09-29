import { Link } from 'react-router-dom'
import type { Publication } from '../data/siteData'
import { ArrowIcon } from './Icons'

export function PublicationCard({ publication }: { publication: Publication }) {
  const detailUrl = `/research/${publication.slug}`

  return (
    <article className="publication-card">
      <Link className="publication-image-wrap" to={detailUrl} aria-label={`Leer más sobre ${publication.title}`}>
        <img
          src={publication.image}
          alt={publication.imageAlt}
          loading="lazy"
        />
      </Link>
      <div className="publication-content">
        <div className="publication-meta">
          <time dateTime={publication.dateTime}>{publication.date}</time>
        </div>
        <h2><Link to={detailUrl}>{publication.title}</Link></h2>
        <p>{publication.description}</p>
        <Link to={detailUrl} className="text-link" aria-label={`Leer más sobre ${publication.title}`}>
          Leer más <ArrowIcon />
        </Link>
      </div>
    </article>
  )
}
