import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import mauricioImage from '../assets/images/mauricio.webp'
import operationOneImage from '../assets/images/acerca de/operacion1.webp'
import operationTwoImage from '../assets/images/acerca de/operacion2.webp'
import presentationImage from '../assets/images/acerca de/exposición.webp'

const gallery = [
  { src: operationOneImage, alt: 'Equipo médico durante una cirugía laparoscópica' },
  { src: presentationImage, alt: 'Mauricio Correa exponiendo en un congreso médico' },
  { src: operationTwoImage, alt: 'Profesionales de salud trabajando en un quirófano' },
]

export function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="page-shell page-hero-grid">
          <div className="about-hero-copy">
            <h1>
              Academia y<br />desarrollo profesional
            </h1>
          </div>
        </div>
      </section>

      <section className="biography-section section-pad">
        <div className="page-shell biography-grid">
          <aside>
            <div className="portrait-crop">
              <img src={mauricioImage} alt="Mauricio Correa" />
            </div>
          </aside>
          <article className="biography-copy">
            <p>
              <strong>Mauricio Correa es ginecólogo y Doctor en Ciencias Médicas (Ph.D.)</strong>, con especialidad en cirugía de mínima invasión y formación extensa en endometriosis y dolor pélvico crónico. Está dedicado al tratamiento integral de la endometriosis y el dolor pélvico, con énfasis en técnicas quirúrgicas de mínima invasión. Con experiencia en manejo de la cirugía de endometriosis, adenomiosis, miomatosis, entre otras.
            </p>
            <p>
              Actualmente dirige la Unidad de Dolor Pélvico y Endometriosis de la Clínica Alemana de Valdivia y desarrolla una activa labor docente como Director del Instituto de Ginecología y Obstetricia de la Universidad Austral de Chile, integrando la atención clínica, la docencia y la investigación.
            </p>
          </article>
        </div>
      </section>

      <section className="gallery-section section-pad">
        <div className="page-shell gallery-heading">
          <h2>Una mirada al trabajo clínico y académico</h2>
        </div>
        <div className="page-shell editorial-gallery">
          {gallery.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.alt} />
            </figure>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <div className="page-shell">
          <h2>Conversemos sobre tu caso</h2>
          <Link to="/contact" className="button button--light">Solicitar evaluación <ArrowIcon /></Link>
        </div>
      </section>
    </>
  )
}
