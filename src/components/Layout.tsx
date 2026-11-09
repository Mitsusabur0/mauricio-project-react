import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { publications } from '../data/siteData'

export function Layout() {
  const { pathname, hash, key } = useLocation()

  // `key` changes on every navigation, so re-clicking a link to the current hash scrolls again.
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Dr. Mauricio Correa | Ginecología y Endometriosis',
      '/about': 'Acerca de | Dr. Mauricio Correa',
      '/research': 'Investigación | Dr. Mauricio Correa',
      '/contact': 'Evaluación | Dr. Mauricio Correa',
    }
    const detail = publications.find((publication) => pathname === `/research/${publication.slug}`)
    document.title = detail ? `${detail.title} | Dr. Mauricio Correa` : titles[pathname] ?? titles['/']
  }, [pathname])

  return (
    <div className="site-frame">
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
