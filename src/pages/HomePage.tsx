import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { FaqAccordion } from '../components/FaqAccordion'
import { SectionHeading } from '../components/SectionHeading'
import { TreatmentCard } from '../components/TreatmentCard'
import heroImage from '../assets/images/home/expo_sochog_mauricio_cropped.jpg'
import surgeryImage from '../assets/images/home/operacion1.webp'
import { credentials, faqs, treatments } from '../data/siteData'

export function HomePage() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-media hero-media--surgery">
          <img src={surgeryImage} alt="Equipo médico durante una cirugía laparoscópica" width="750" height="1000" />
        </div>
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
        <div className="hero-media hero-media--presentation">
          <img src={heroImage} alt="Dr. Mauricio Correa exponiendo en un congreso de SOCHOG" width="693" height="924" fetchPriority="high" />
        </div>
      </section>

      <section className="credentials-section section-pad">
        <div className="page-shell credentials-grid">
          <SectionHeading title="Experiencia clínica, docente y científica" />
          <div className="credentials-content">
            <p>
              Una trayectoria construida a partir de la práctica clínica, la especialización, la docencia y la participación activa en instituciones médicas.
            </p>
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
            title="Tratamientos con una mirada integral"
            description="Diagnóstico preciso, decisiones informadas y técnicas de mínima invasión para cada etapa del tratamiento. Cada caso requiere una evaluación personalizada y, cuando corresponde, el trabajo coordinado de un equipo multidisciplinario."
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
