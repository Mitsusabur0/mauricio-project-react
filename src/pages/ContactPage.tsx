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
      <section className="contact-page">
        <div className="contact-image-panel">
          <img src={images.clinic} alt="Consulta médica, imagen editorial referencial" />
          <div className="contact-image-copy">
            <span className="eyebrow eyebrow--light">Valdivia · Chile</span>
            <p>Atención especializada y evaluación personalizada.</p>
          </div>
        </div>
        <div className="contact-form-panel">
          <div className="contact-form-inner">
            <span className="eyebrow">Contacto</span>
            <h1>Evaluación Dr. Mauricio Correa</h1>
            <p className="contact-intro">
              Completa el formulario y nos pondremos en contacto contigo para orientar los próximos pasos.
            </p>

            <div className="contact-links">
              <a href="mailto:contacto@drmauriciocorrea.cl">
                <MailIcon />
                <span><small>Correo</small>contacto@drmauriciocorrea.cl</span>
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
                <p>Este formulario es una demostración y está listo para conectarse a un servicio de envío.</p>
                <button className="button button--primary" type="submit">Enviar solicitud</button>
              </div>
              {submitted && (
                <p className="form-success field--wide" role="status">
                  Gracias. Tu solicitud fue registrada correctamente en esta demostración.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
