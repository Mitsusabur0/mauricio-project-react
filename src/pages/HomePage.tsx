import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { FaqAccordion } from '../components/FaqAccordion'
import { SectionHeading } from '../components/SectionHeading'
import { TreatmentCard } from '../components/TreatmentCard'
import { credentials, faqs, images, treatments } from '../data/siteData'

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-media" aria-hidden="true">
          <img src={images.clinic} alt="" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content page-shell">
          <div className="hero-copy">
            <span className="eyebrow eyebrow--light">Ginecología especializada · Valdivia</span>
            <h1>Dr. Mauricio<br />Correa</h1>
            <p>Director Unidad Dolor pélvico y Endometriosis</p>
            <span>Clínica Alemana Valdivia</span>
            <div className="hero-actions">
              <Link to="/contact" className="button button--primary">
                Solicitar evaluación <ArrowIcon />
              </Link>
              <a href="#tratamientos" className="button button--ghost">Conocer tratamientos</a>
            </div>
          </div>
          <div className="hero-note">
            <span>01</span>
            <p>Atención integral, cirugía avanzada y acompañamiento especializado.</p>
          </div>
        </div>
      </section>

      <section id="tratamientos" className="treatments-section section-pad">
        <div className="page-shell split-intro">
          <SectionHeading
            eyebrow="Áreas de atención"
            title="Tratamientos con una mirada integral"
            description="Diagnóstico preciso, decisiones informadas y técnicas de mínima invasión para cada etapa del tratamiento."
          />
          <p className="intro-side-note">
            Cada caso requiere una evaluación personalizada y, cuando corresponde, el trabajo coordinado de un equipo multidisciplinario.
          </p>
        </div>
        <div className="page-shell treatments-list">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.title} treatment={treatment} index={index} />
          ))}
        </div>
      </section>

      <section className="expertise-band">
        <div className="expertise-image">
          <img src={images.surgery} alt="Equipo utilizando instrumental de cirugía mínimamente invasiva" />
          <span className="image-caption">Imagen editorial referencial</span>
        </div>
        <div className="expertise-copy">
          <span className="eyebrow eyebrow--light">Precisión quirúrgica</span>
          <blockquote>“Menor trauma, mayor visualización y una recuperación más cuidadosa.”</blockquote>
          <p>
            La cirugía de mínima invasión reúne tecnología, experiencia y planificación para abordar patologías ginecológicas complejas.
          </p>
          <Link to="/about" className="text-link text-link--light">Conocer trayectoria <ArrowIcon /></Link>
        </div>
      </section>

      <section className="credentials-section section-pad">
        <div className="page-shell credentials-grid">
          <SectionHeading
            eyebrow="Academia y desarrollo profesional"
            title="Experiencia clínica, docente y científica"
          />
          <ul className="credentials-list">
            {credentials.map((credential, index) => (
              <li key={credential}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{credential}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="page-shell faq-grid">
          <div className="faq-intro">
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Información clara para tomar decisiones"
              tone="dark"
            />
            <p>Si tu pregunta no está aquí, puedes escribir directamente a través del formulario de contacto.</p>
            <Link to="/contact" className="button button--outline-light">Ir a contacto <ArrowIcon /></Link>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  )
}
