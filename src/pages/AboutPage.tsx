import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { GalleryCarousel, type GalleryImage } from '../components/GalleryCarousel'
import mauricioImage from '../assets/images/mauricio.webp'
import galleryImage1 from '../assets/images/acerca de/1.webp'
import galleryImage2 from '../assets/images/acerca de/2.webp'
import galleryImage3 from '../assets/images/acerca de/3.webp'
import galleryImage4 from '../assets/images/acerca de/4.webp'
import galleryImage5 from '../assets/images/acerca de/5.jpg'
import galleryImage6 from '../assets/images/acerca de/6.jpg'

const affiliations = ['Clínica Alemana Valdivia', 'Universidad Austral de Chile']

const gallery: GalleryImage[] = [
  { src: galleryImage1, alt: 'Mauricio Correa exponiendo en un congreso médico' },
  { src: galleryImage2, alt: 'Equipo quirúrgico durante una cirugía laparoscópica' },
  { src: galleryImage3, alt: 'Cirujanos siguiendo una laparoscopía en el monitor del quirófano' },
  { src: galleryImage4, alt: 'Equipo médico en el quirófano durante una cirugía de mínima invasión' },
  // Landscape shot: keep the monitor and the standing surgeon in the portrait frame
  { src: galleryImage5, alt: 'Monitores de laparoscopía durante una intervención en el quirófano', position: '62% center' },
  { src: galleryImage6, alt: 'Cirugía en curso en un quirófano con luz tenue' },
]

export function AboutPage() {
  return (
    <>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="page-shell about-hero__grid">
          <div className="about-hero__copy">
            <h1 id="about-title">
              Dr. Mauricio<br />Correa
            </h1>
            <p className="about-hero__lead">
              Ginecólogo y Doctor en Ciencias Médicas (Ph.D.), especialista en cirugía de mínima invasión y endometriosis.
            </p>
            <ul className="about-hero__affiliations" aria-label="Instituciones">
              {affiliations.map((affiliation) => (
                <li key={affiliation}>{affiliation}</li>
              ))}
            </ul>
          </div>
          <figure className="about-hero__portrait">
            <img src={mauricioImage} width={824} height={1074} alt="Retrato del Dr. Mauricio Correa" />
          </figure>
        </div>
      </section>

      <section className="about-profile section-pad">
        <div className="page-shell">
          <div className="about-profile__body">
            <p>
              <strong>Mauricio Correa es ginecólogo y Doctor en Ciencias Médicas (Ph.D.)</strong>, con especialidad en
              cirugía de mínima invasión y formación extensa en endometriosis y dolor pélvico crónico. Cuenta con
              experiencia en la cirugía de endometriosis, adenomiosis y miomatosis, entre otras patologías.
            </p>
            <p>
              Actualmente dirige la Unidad de Dolor Pélvico y Endometriosis de la Clínica Alemana de Valdivia y desarrolla
              una activa labor docente como Director del Instituto de Ginecología y Obstetricia de la Universidad Austral
              de Chile, integrando la atención clínica, la docencia y la investigación.
            </p>
          </div>
        </div>
      </section>

      <section className="about-gallery section-pad" aria-labelledby="about-gallery-title">
        <div className="page-shell">
          <h2 id="about-gallery-title" className="eyebrow about-gallery__label">Galería</h2>
          <GalleryCarousel label="Fotografías" images={gallery} />
        </div>
      </section>

      <section className="closing-cta">
        <div className="page-shell">
          <h2>Conversemos sobre tu caso</h2>
          <Link to="/contact#solicitar-evaluacion" className="button button--light">Solicitar evaluación <ArrowIcon /></Link>
        </div>
      </section>
    </>
  )
}
