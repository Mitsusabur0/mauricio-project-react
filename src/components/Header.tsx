import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/about', label: 'Acerca de' },
  { to: '/research', label: 'Investigación' },
  { to: '/contact', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <div className="nav-shell">
        <NavLink to="/" className="brand" aria-label="Dr. Mauricio Correa, inicio">
          <span className="brand-name">Dr. Mauricio Correa</span>
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav id="site-navigation" className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Navegación principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
            Solicitar evaluación
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
