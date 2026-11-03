import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { FaqAccordion } from '../components/FaqAccordion'
import { SectionHeading } from '../components/SectionHeading'
import { TreatmentCard } from '../components/TreatmentCard'
import heroVideo from '../assets/videos/contact-hero-1080p.mp4'
import { credentials, faqs, treatments } from '../data/siteData'

export function HomePage() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <video className="hero-video" src={heroVideo} autoPlay muted loop playsInline aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-copy">
            <h1 id="hero-title">
              Dr. Mauricio<br />Correa
            </h1>
            <p>Director Unidad Dolor pélvico y Endometriosis, Clínica Alemana Valdivia</p>
            <div className="hero-actions">
              <Link to="/contact" className="button button--primary">
                Solicitar evaluación <ArrowIcon />
              </Link>
              <a href="#tratamientos" className="button button--hero-secondary">Conocer tratamientos</a>
            </div>
          </div>
        </div>
      </section>

      <section className="credentials-section section-pad">
        <div className="page-shell credentials-grid">
          <SectionHeading title="Experiencia clínica, docente y científica" />
          <div className="credentials-content">
            <ul className="credentials-list">
              {credentials.map((credential) => (
                <li key={credential}>
                  <p>{credential}</p>
                </li>
              ))}
            </ul>
            <Link to="/about" className="text-link credentials-link">
              Conoce al doctor <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="tratamientos" className="treatments-section section-pad">
        <div className="page-shell split-intro">
          <SectionHeading
            title="Tratamientos"
            description="Cada caso requiere una evaluación personalizada y, cuando corresponde, el trabajo coordinado de un equipo multidisciplinario."
          />
        </div>
        <div className="page-shell treatments-list">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.title} treatment={treatment} index={index} />
          ))}
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="page-shell faq-grid">
          <div className="faq-intro">
            <SectionHeading title="Preguntas Frecuentes" tone="dark" />
            <p>Si tu pregunta no está aquí, puedes escribir directamente a través del formulario de contacto.</p>
            <Link to="/contact" className="button button--outline-light">Ir a contacto <ArrowIcon /></Link>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  )
}
