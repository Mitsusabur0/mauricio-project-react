import { useState } from 'react'
import type { Condition, ConditionId } from '../data/siteData'

type Lesion = { cx: number; cy: number; r: number }

const LESIONS: Record<ConditionId, Lesion[]> = {
  endometriosis: [
    { cx: 150, cy: 74, r: 10 },
    { cx: 238, cy: 74, r: 9 },
    { cx: 316, cy: 92, r: 10 },
    { cx: 84, cy: 128, r: 9 },
    { cx: 58, cy: 181, r: 12 },
    { cx: 77, cy: 193, r: 10 },
    { cx: 64, cy: 202, r: 8 },
    { cx: 342, cy: 181, r: 12 },
    { cx: 323, cy: 193, r: 10 },
    { cx: 336, cy: 202, r: 8 },
    { cx: 96, cy: 152, r: 8 },
    { cx: 304, cy: 152, r: 8 },
    { cx: 172, cy: 318, r: 9 },
    { cx: 228, cy: 318, r: 9 },
  ],
  adenomiosis: [
    { cx: 160, cy: 178, r: 6 },
    { cx: 166, cy: 208, r: 5 },
    { cx: 156, cy: 234, r: 6 },
    { cx: 150, cy: 198, r: 5 },
    { cx: 240, cy: 178, r: 6 },
    { cx: 246, cy: 210, r: 5 },
    { cx: 252, cy: 236, r: 6 },
    { cx: 256, cy: 202, r: 5 },
    { cx: 244, cy: 256, r: 6 },
    { cx: 233, cy: 264, r: 5 },
    { cx: 251, cy: 248, r: 5 },
    { cx: 238, cy: 244, r: 5 },
    { cx: 186, cy: 135, r: 5 },
    { cx: 214, cy: 135, r: 5 },
    { cx: 200, cy: 129, r: 5 },
  ],
}

const BOWEL_PATH =
  'M96,74 L304,74 A18,18 0 0 1 304,110 L96,110 A18,18 0 0 0 96,146 L304,146 A18,18 0 0 1 304,182 L120,182'

const ANATOMY_LABELS = [
  { text: 'INTESTINO', dotX: 216, dotY: 60, leader: 'M216,60 L216,38', x: 216, y: 32, anchor: 'middle' },
  { text: 'TROMPA', dotX: 95, dotY: 128, leader: 'M95,128 L42,108', x: 38, y: 105, anchor: 'end' },
  { text: 'OVARIO', dotX: 46, dotY: 190, leader: 'M46,190 L16,206', x: 12, y: 211, anchor: 'end' },
  { text: 'ÚTERO', dotX: 266, dotY: 210, leader: 'M266,210 L350,226', x: 356, y: 231, anchor: 'start' },
  { text: 'VEJIGA', dotX: 255, dotY: 320, leader: 'M255,320 L352,302', x: 358, y: 307, anchor: 'start' },
] as const

export function ConditionDiagram({ conditions }: { conditions: Condition[] }) {
  const [active, setActive] = useState(conditions[0])

  return (
    <div className={`condition-explorer is-${active.id}`}>
      <div>
        <div className="condition-toggle" role="group" aria-label="Elegir condición">
          {conditions.map((condition) => (
            <button
              key={condition.id}
              type="button"
              className="button"
              aria-pressed={condition.id === active.id}
              onClick={() => setActive(condition)}
            >
              {condition.name}
            </button>
          ))}
        </div>

        <figure className="condition-figure">
          <svg
            viewBox="-70 14 510 348"
            role="img"
            aria-label={`Diagrama de útero, trompas, ovarios, intestino y vejiga con focos de ${active.name.toLowerCase()}`}
          >
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={BOWEL_PATH} stroke="var(--bowel-stroke)" strokeWidth="30" />
              <path d={BOWEL_PATH} stroke="var(--bowel-fill)" strokeWidth="21" />
              <path d={BOWEL_PATH} stroke="var(--bowel-highlight)" strokeWidth="6" strokeOpacity="0.55" />
            </g>

            <g fill="none" stroke="var(--organ-stroke)" strokeWidth="6" strokeLinecap="round">
              <path d="M138,148 C112,120 86,118 66,134 C52,146 56,164 74,168" />
              <path d="M262,148 C288,120 314,118 334,134 C348,146 344,164 326,168" />
            </g>
            <g fill="var(--ovary-fill)" stroke="var(--organ-stroke)" strokeWidth="5">
              <ellipse cx="62" cy="186" rx="23" ry="15" />
              <ellipse cx="338" cy="186" rx="23" ry="15" />
            </g>

            <g className="condition-uterus">
              <path
                d="M186,306 L214,306 L210,342 Q200,349 190,342 Z"
                fill="var(--organ-fill)"
                stroke="var(--organ-stroke)"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <path
                className="condition-uterus-wall"
                d="M125,150 C125,118 158,102 200,102 C242,102 275,118 275,150 C282,205 252,260 222,295 C214,304 208,308 200,308 C192,308 186,304 178,295 C148,260 118,205 125,150 Z"
                fill="var(--organ-fill)"
                stroke="var(--organ-stroke)"
                strokeLinejoin="round"
              />
              <path d="M170,160 L230,160 L204,254 L200,259 L196,254 Z" fill="var(--organ-cavity)" />
            </g>

            <ellipse
              cx="200"
              cy="314"
              rx="58"
              ry="40"
              fill="var(--bowel-fill)"
              fillOpacity="0.75"
              stroke="var(--bowel-stroke)"
              strokeWidth="3"
            />

            {conditions.map(({ id }) => (
              <g
                key={id}
                className={`condition-lesions condition-lesions--${id}${id === active.id ? ' is-active' : ''}`}
              >
                {LESIONS[id].map((lesion) => (
                  <circle key={`${lesion.cx}-${lesion.cy}`} className="condition-lesion" {...lesion} />
                ))}
              </g>
            ))}

            {ANATOMY_LABELS.map((label) => (
              <g key={label.text}>
                <circle cx={label.dotX} cy={label.dotY} r="2.6" fill="var(--anatomy-leader)" />
                <path d={label.leader} fill="none" stroke="var(--anatomy-leader)" strokeWidth="1.5" />
                <text className="condition-anatomy-label" x={label.x} y={label.y} textAnchor={label.anchor}>
                  {label.text}
                </text>
              </g>
            ))}
          </svg>
        </figure>
      </div>

      <div className="condition-details" aria-live="polite">
        <div key={active.id} className="condition-details-body">
          <p className="condition-tagline">{active.tagline}</p>
          <h3>{active.name}</h3>
          <p className="condition-description">{active.description}</p>

          <h4 className="condition-subheading">Dónde</h4>
          <p className="condition-location">{active.location}</p>

          <h4 className="condition-subheading">Síntomas frecuentes</h4>
          <ul className="condition-symptoms">
            {active.symptoms.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>
        <p className="condition-disclaimer">Contenido educativo · No sustituye la valoración médica</p>
      </div>
    </div>
  )
}
