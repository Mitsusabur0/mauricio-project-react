import { PublicationCard } from '../components/PublicationCard'
import { publications } from '../data/siteData'

export function ResearchPage() {
  return (
    <>
      <section className="page-hero research-hero">
        <div className="page-shell research-hero-grid">
          <div className="research-heading">
            <h1>Investigación</h1>
          </div>
          <p className="research-intro">
            Publicaciones, reconocimientos y actividades académicas vinculadas a la ginecología, la endometriosis y la cirugía de mínima invasión.
          </p>
        </div>
      </section>

      <section className="publications-section section-pad">
        <div className="page-shell publication-list">
          <div className="publication-list-head">
            <span>Publicaciones y noticias</span>
            <span>{String(publications.length).padStart(2, '0')} entradas</span>
          </div>
          {publications.map((publication) => (
            <PublicationCard key={publication.title} publication={publication} />
          ))}
        </div>
      </section>
    </>
  )
}
