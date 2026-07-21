import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { credentials, images } from '../data/siteData'

const gallery = [
  { src: images.clinic, alt: 'Consulta médica contemporánea, imagen editorial referencial', position: 'right center' },
  { src: images.surgery, alt: 'Cirugía mínimamente invasiva, imagen editorial referencial', position: 'center center' },
  { src: images.research, alt: 'Trabajo de investigación médica, imagen editorial referencial', position: 'center center' },
  { src: images.clinic, alt: 'Revisión de imágenes clínicas, imagen editorial referencial', position: '83% center' },
  { src: images.surgery, alt: 'Instrumental laparoscópico, imagen editorial referencial', position: '20% center' },
]

export function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="page-shell page-hero-grid">
          <div>
            <span className="eyebrow">Trayectoria</span>
            <h1>Academia y<br />desarrollo profesional</h1>
          </div>
          <p>Una práctica construida en la convergencia entre atención clínica, docencia e investigación.</p>
        </div>
      </section>

      <section className="biography-section section-pad">
        <div className="page-shell biography-grid">
          <aside>
            <span className="vertical-label">Perfil profesional</span>
            <div className="portrait-crop">
              <img src={images.clinic} alt="Médico revisando imágenes clínicas, fotografía editorial referencial" />
            </div>
          </aside>
          <article className="biography-copy">
            <p className="lead">
              Mauricio Correa es ginecólogo y Doctor en Ciencias Médicas (Ph.D.), con especialidad en cirugía de mínima invasión y formación extensa en endometriosis y dolor pélvico crónico. Está dedicado al tratamiento integral de la endometriosis y el dolor pélvico, con énfasis en técnicas quirúrgicas de mínima invasión. Con experiencia en manejo de la cirugía de endometriosis, adenomiosis, miomatosis, entre otras.
            </p>
            <p>
              Actualmente dirige la Unidad de Dolor Pélvico y Endometriosis de la Clínica Alemana de Valdivia y desarrolla una activa labor docente como Director del Instituto de Ginecología y Obstetricia de la Universidad Austral de Chile, integrando la atención clínica, la docencia y la investigación.
            </p>
            <div className="signature-line">
              <span>Dr. Mauricio Correa</span>
              <small>Ginecólogo · Ph.D.</small>
            </div>
          </article>
        </div>
      </section>

      <section className="career-section section-pad">
        <div className="page-shell career-grid">
          <div className="career-title">
            <span className="eyebrow eyebrow--light">Experiencia</span>
            <h2>Credenciales profesionales</h2>
          </div>
          <ol className="career-list">
            {credentials.map((credential, index) => (
              <li key={credential}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{credential}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gallery-section section-pad">
        <div className="page-shell gallery-heading">
          <div>
            <span className="eyebrow">Práctica y academia</span>
            <h2>Una mirada al trabajo clínico</h2>
          </div>
          <p>Espacios referenciales para fotografías de consulta, cirugía, docencia e investigación.</p>
        </div>
        <div className="page-shell editorial-gallery">
          {gallery.map((item, index) => (
            <figure key={`${item.alt}-${index}`}>
              <img src={item.src} alt={item.alt} style={{ objectPosition: item.position }} />
              <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <div className="page-shell">
          <span className="eyebrow eyebrow--light">Atención especializada</span>
          <h2>Conversemos sobre tu caso</h2>
          <Link to="/contact" className="button button--light">Solicitar evaluación <ArrowIcon /></Link>
        </div>
      </section>
    </>
  )
}
