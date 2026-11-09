import { type CSSProperties, useEffect, useId, useRef, useState } from 'react'
import { ArrowIcon } from './Icons'

export type GalleryImage = {
  src: string
  alt: string
  /** Intrinsic size: sizes each frame before its image loads, so nothing jumps. */
  width: number
  height: number
}

type GalleryCarouselProps = {
  title: string
  images: GalleryImage[]
  /** Milliseconds each photo stays on screen before the next one fades in. */
  interval?: number
}

const SWIPE_THRESHOLD = 40

const markReached = (index: number) => (previous: ReadonlySet<number>) =>
  previous.has(index) ? previous : new Set(previous).add(index)

export function GalleryCarousel({ title, images, interval = 3000 }: GalleryCarouselProps) {
  const stageId = useId()
  const bodyRef = useRef<HTMLDivElement>(null)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const count = images.length

  const [current, setCurrent] = useState(0)
  // Photos the visitor has seen. Only these and the photo right after each one get their
  // image requested, so photos load one step ahead instead of all at once.
  const [reached, setReached] = useState<ReadonlySet<number>>(() => new Set([0]))
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)

  // Autoplay only while the gallery is on screen and the visitor isn't pointing at it or
  // navigating it with the keyboard.
  const autoplay = inView && !hovered && !keyboardFocused && count > 1

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(body)
    return () => observer.disconnect()
  }, [])

  // Re-armed on every change of photo, so a manual step also restarts the countdown.
  useEffect(() => {
    if (!autoplay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => {
      const next = (current + 1) % count
      setCurrent(next)
      setReached(markReached(next))
    }, interval)
    return () => window.clearTimeout(timer)
  }, [autoplay, current, count, interval])

  const goTo = (index: number) => {
    const next = (index + count) % count
    setCurrent(next)
    setReached(markReached(next))
  }

  return (
    <div className="gallery-carousel">
      <div className="page-shell gallery-heading">
        <h2>{title}</h2>
      </div>

      <div
        ref={bodyRef}
        className="page-shell gallery-carousel__body"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={(event) => {
          if (event.target.matches(':focus-visible')) setKeyboardFocused(true)
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocused(false)
        }}
      >
        <div
          id={stageId}
          className="gallery-carousel__stage"
          role="region"
          aria-roledescription="carrusel"
          aria-label={title}
          aria-live={autoplay ? 'off' : 'polite'}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              goTo(current + (event.key === 'ArrowRight' ? 1 : -1))
            }
          }}
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse') swipeStart.current = { x: event.clientX, y: event.clientY }
          }}
          onPointerUp={(event) => {
            const start = swipeStart.current
            swipeStart.current = null
            if (!start) return
            const dx = event.clientX - start.x
            const dy = event.clientY - start.y
            if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) goTo(current + (dx < 0 ? 1 : -1))
          }}
          onPointerCancel={() => {
            swipeStart.current = null
          }}
        >
          {images.map((image, index) => {
            const isActive = index === current
            const shouldLoad = reached.has(index) || reached.has((index - 1 + count) % count)
            return (
              <div
                key={image.src}
                className={`gallery-carousel__slide${isActive ? ' is-active' : ''}`}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${count}`}
                aria-hidden={!isActive}
              >
                <div
                  className="gallery-carousel__frame"
                  style={{ '--ratio': image.width / image.height } as CSSProperties}
                >
                  {shouldLoad && (
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="gallery-carousel__bar">
          <div className="gallery-carousel__segments">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`gallery-carousel__segment${index === current ? ' is-active' : ''}`}
                aria-label={`Ver imagen ${index + 1} de ${count}`}
                aria-current={index === current ? 'true' : undefined}
                aria-controls={stageId}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <div className="gallery-carousel__arrows">
            <button
              type="button"
              className="gallery-carousel__button gallery-carousel__button--prev"
              aria-controls={stageId}
              aria-label="Imagen anterior"
              onClick={() => goTo(current - 1)}
            >
              <ArrowIcon />
            </button>
            <button
              type="button"
              className="gallery-carousel__button"
              aria-controls={stageId}
              aria-label="Imagen siguiente"
              onClick={() => goTo(current + 1)}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
