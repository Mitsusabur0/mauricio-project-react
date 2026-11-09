import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { GalleryCarousel, type GalleryImage } from '../components/GalleryCarousel'
import { SectionHeading } from '../components/SectionHeading'
import mauricioImage from '../assets/images/mauricio.webp'
import galleryImage1 from '../assets/images/acerca de/1.webp'
import galleryImage2 from '../assets/images/acerca de/2.webp'
import galleryImage3 from '../assets/images/acerca de/3.webp'
import galleryImage4 from '../assets/images/acerca de/4.webp'
import galleryImage5 from '../assets/images/acerca de/5.jpg'
import galleryImage6 from '../assets/images/acerca de/6.jpg'

const affiliations = ['Clínica Alemana Valdivia', 'Universidad Austral de Chile']

const focusAreas = ['Endometriosis', 'Adenomiosis', 'Miomatosis', 'Dolor pélvico crónico', 'Cirugía de mínima invasión']

type Pillar = {
  title: string
  description: string
  roles: { title: string; place?: string }[]
  link?: { to: string; label: string }
}

const pillars: Pillar[] = [
  {
    title: 'Atención clínica',
    description:
      'Evaluación y tratamiento de la endometriosis, la adenomiosis y el dolor pélvico crónico, con técnicas de mínima invasión y el apoyo de un equipo multidisciplinario.',
    roles: [{ title: 'Director, Unidad de Dolor Pélvico y Endometriosis', place: 'Clínica Alemana Valdivia' }],
    link: { to: '/#tratamientos', label: 'Ver tratamientos' },
  },
  {
    title: 'Docencia',
    description:
      'Una activa labor docente en la Universidad Austral de Chile, donde la experiencia clínica y la investigación se integran en la formación médica.',
    roles: [{ title: 'Director, Instituto de Ginecología y Obstetricia', place: 'Universidad Austral de Chile' }],
  },
  {
    title: 'Investigación',
    description:
      'Publicaciones, reconocimientos y actividades académicas vinculadas a la ginecología, la endometriosis y la cirugía de mínima invasión.',
    roles: [
      { title: 'Doctor en Ciencias Médicas (Ph.D.)' },
      { title: 'Miembro del Directorio, Capítulo de Cirugía Mínimamente Invasiva', place: 'SOCHOG' },
    ],
    link: { to: '/research', label: 'Ver investigación' },
  },
]

const gallery: GalleryImage[] = [
  { src: galleryImage1, width: 750, height: 1125, alt: 'Mauricio Correa exponiendo en un congreso médico' },
  { src: galleryImage2, width: 750, height: 1000, alt: 'Equipo quirúrgico durante una cirugía laparoscópica' },
  { src: galleryImage3, width: 960, height: 1280, alt: 'Cirujanos siguiendo una laparoscopía en el monitor del quirófano' },
  { src: galleryImage4, width: 960, height: 1280, alt: 'Equipo médico en el quirófano durante una cirugía de mínima invasión' },
  { src: galleryImage5, width: 1280, height: 960, alt: 'Monitores de laparoscopía durante una intervención en el quirófano' },
  { src: galleryImage6, width: 960, height: 1280, alt: 'Cirugía en curso en un quirófano con luz tenue' },
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
        <div className="page-shell about-profile__grid">
          <h2 className="about-profile__statement">
            Dedicado al tratamiento integral de la <em>endometriosis y el dolor pélvico</em>, con énfasis en técnicas
            quirúrgicas de mínima invasión.
          </h2>
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
            <h3 className="about-subheading">Áreas de experiencia</h3>
            <ul className="about-focus">
              {focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-pillars section-pad">
        <div className="page-shell">
          <SectionHeading
            title={'Clínica, docencia e investigación'}
            description="Tres ámbitos que se complementan en una misma práctica."
            tone="dark"
          />
          <ol className="about-pillars__list">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="about-pillar">
                <span className="about-pillar__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <ul className="about-pillar__roles">
                  {pillar.roles.map((role) => (
                    <li key={role.title}>
                      <strong>{role.title}</strong>
                      {role.place && <span>{role.place}</span>}
                    </li>
                  ))}
                </ul>
                {pillar.link && (
                  <Link to={pillar.link.to} className="text-link text-link--light">
                    {pillar.link.label} <ArrowIcon />
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gallery-section section-pad">
        <GalleryCarousel title="Galería" images={gallery} />
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
