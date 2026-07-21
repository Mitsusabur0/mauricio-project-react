import { Link } from 'react-router-dom'
import { InstagramIcon } from './Icons'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <div className="footer-brand">
          <span className="brand-mark brand-mark--footer" aria-hidden="true">MC</span>
          <div>
            <strong>Dr. Mauricio Correa</strong>
            <p>Endometriosis · Dolor pélvico · Cirugía de mínima invasión</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Navegación de pie de página">
          <Link to="/about">Acerca de</Link>
          <a href="https://www.instagram.com/dr.mauricio.correa/" target="_blank" rel="noreferrer">
            <InstagramIcon /> Instagram
          </a>
          <Link to="/contact">Contacto</Link>
        </nav>
      </div>
      <div className="footer-bottom page-shell">
        <span>Clínica Alemana Valdivia</span>
        <span>© {new Date().getFullYear()} Dr. Mauricio Correa</span>
      </div>
    </footer>
  )
}
