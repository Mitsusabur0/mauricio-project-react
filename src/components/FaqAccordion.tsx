import { useState } from 'react'
import { PlusIcon } from './Icons'

type Faq = {
  question: string
  answer: string
  linkText?: string
  linkUrl?: string
  bullets?: string[]
  extra?: string
  footnote?: string
}

function AnswerText({ faq }: { faq: Faq }) {
  if (!faq.linkText || !faq.linkUrl) return <>{faq.answer}</>
  const [before, after] = faq.answer.split(faq.linkText)
  return (
    <>
      {before}
      <a href={faq.linkUrl} target="_blank" rel="noreferrer">{faq.linkText}</a>
      {after}
    </>
  )
}

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="faq-list">
      {items.map((faq, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`
        return (
          <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={faq.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{faq.question}</span>
              <PlusIcon />
            </button>
            <div id={panelId} className="faq-answer" hidden={!isOpen}>
              <p><AnswerText faq={faq} /></p>
              {faq.bullets && (
                <ul>
                  {faq.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {faq.extra && <p>{faq.extra}</p>}
              {faq.footnote && <p className="footnote">{faq.footnote}</p>}
            </div>
          </article>
        )
      })}
    </div>
  )
}
