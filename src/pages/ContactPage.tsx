import { useState } from 'react'
import type { FormEvent } from 'react'
import { InstagramIcon, MailIcon } from '../components/Icons'
import { images } from '../data/siteData'

type FormState = { name: string; email: string; message: string }
type ErrorState = Partial<Record<keyof FormState, string>>

export function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ErrorState>({})
  const [submitted, setSubmitted] = useState(false)

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: ErrorState = {}
    if (!form.name.trim()) nextErrors.name = 'Ingresa tu nombre.'
    if (!form.email.trim()) nextErrors.email = 'Ingresa tu correo electrónico.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Ingresa un correo electrónico válido.'
    if (!form.message.trim()) nextErrors.message = 'Cuéntanos brevemente el motivo de tu consulta.'
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitted(false)
  }

  return (
    <>
      <section className="contact-hero">
        <img src={images.clinic} alt="" aria-hidden="true" />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content page-shell">
          <h1>Evaluación Dr. Mauricio Correa</h1>
        </div>
      </section>

      <section className="contact-content section-pad">
        <div className="page-shell contact-grid">
          <div className="contact-form-panel">
            <h2>Solicita tu evaluación</h2>
            <p className="contact-intro">
              Completa el formulario y nos pondremos en contacto contigo para orientar los próximos pasos.
            </p>

            <div className="contact-links">
              <a href="mailto:doctormauriciocorrea@gmail.com">
                <MailIcon />
                <span><small>Correo</small>doctormauriciocorrea@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/dr.mauricio.correa/" target="_blank" rel="noreferrer">
                <InstagramIcon />
                <span><small>Instagram</small>@dr.mauricio.correa</span>
              </a>
            </div>

            <form className="contact-form" onSubmit={submitForm} noValidate>
              <div className="field">
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
              </div>
              <div className="field field--wide">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
              </div>
              <div className="form-submit-row field--wide">
                <button className="button button--primary" type="submit">Enviar solicitud</button>
              </div>
              {submitted && (
                <p className="form-success field--wide" role="status">
                  Gracias. Tu solicitud fue registrada correctamente en esta demostración.
                </p>
              )}
            </form>
          </div>
          <div className="contact-map-panel">
            <iframe
              title="Mapa de Clínica Alemana de Valdivia"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12257.93793875355!2d-73.2395179!3d-39.818554!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0xec0daf53bf5b4119!2sCl%C3%ADnica+Alemana+Valdivia!5e0!3m2!1ses!2scl!4v1596061894596!5m2!1ses!2scl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  )
}
