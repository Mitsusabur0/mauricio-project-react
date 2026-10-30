import { useState } from 'react'
import { ArrowIcon, PlusIcon } from './Icons'

type Treatment = {
  title: string
  description: string
  image: string
  imageAlt: string
  detailTitle?: string
  detail?: string
  guideLabel?: string
  guideUrl?: string
}

type TreatmentCardProps = {
  treatment: Treatment
  index: number
}

export function TreatmentCard({ treatment, index }: TreatmentCardProps) {
  const [open, setOpen] = useState(index === 0)
  const panelId = `treatment-panel-${index}`

  return (
    <article className={`treatment-card${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="treatment-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="treatment-title">{treatment.title}</span>
        <span className="round-icon"><PlusIcon /></span>
      </button>
      <div id={panelId} className="treatment-panel" hidden={!open}>
        <div className="treatment-copy">
          <p>{treatment.description}</p>
          {treatment.detailTitle && treatment.detail && (
            <p>
              <em>{treatment.detailTitle}</em>: {treatment.detail}
            </p>
          )}
          {treatment.guideUrl && treatment.guideLabel && (
            <a className="treatment-guide-link" href={treatment.guideUrl} target="_blank" rel="noreferrer">
              <span>{treatment.guideLabel}</span>
              <ArrowIcon />
            </a>
          )}
        </div>
        <img
          className="treatment-image"
          src={treatment.image}
          alt={treatment.imageAlt}
          loading="lazy"
        />
      </div>
    </article>
  )
}
