import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { publications } from '../data/siteData'

export function ResearchDetailPage() {
  const { slug } = useParams()
  const publication = publications.find((entry) => entry.slug === slug)

  if (!publication) return <Navigate to="/research" replace />

  return (
    <article className="research-detail">
      <div className="page-shell research-detail-shell">
        <nav className="research-breadcrumb" aria-label="Ruta de navegación">
          <Link to="/research">Investigación</Link>
          <span aria-hidden="true">/</span>
          <span>Detalle</span>
        </nav>

        <div className="research-detail-lead">
          <header className="research-detail-header">
            <h1>{publication.title}</h1>
            <time dateTime={publication.dateTime}>{publication.date}</time>
          </header>

          <figure className="research-detail-media">
            <img src={publication.image} alt={publication.imageAlt} />
          </figure>
        </div>

        <div className="research-detail-body">
          {publication.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          {publication.participants && (
            <section className="research-participants" aria-labelledby="participants-heading">
              <h2 id="participants-heading">En esta investigación han participado:</h2>
              <ul>
                {publication.participants.map((participant) => <li key={participant}>{participant}</li>)}
              </ul>
            </section>
          )}

          {publication.externalLink && (
            <a
              className="text-link research-source-link"
              href={publication.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {publication.externalLink.label} <ArrowIcon />
            </a>
          )}
        </div>

        <div className="research-detail-footer">
          <Link to="/research" className="text-link">Volver a investigación <ArrowIcon /></Link>
        </div>
      </div>
    </article>
  )
}
