import { type CSSProperties, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowIcon, CloseIcon } from './Icons'

export type GalleryImage = {
  src: string
  alt: string
  /** CSS object-position for photos whose subject isn't centred once cropped to the frame. */
  position?: string
}

type GalleryCarouselProps = {
  /** Accessible name of the carousel (not shown on screen). */
  label: string
  images: GalleryImage[]
  /** Milliseconds between automatic steps. */
  interval?: number
  className?: string
}

const SWIPE_THRESHOLD = 40
// Slack for float rounding when deciding whether a photo sits fully inside the frame
const EPSILON = 0.01

/** How many photos the stylesheet fits side by side (`--per-view`, set per breakpoint). */
const readPerView = (element: HTMLElement) => {
  const value = parseFloat(getComputedStyle(element).getPropertyValue('--per-view'))
  return Number.isFinite(value) && value > 0 ? value : 1
}

// Photos open enlarged only outside the stylesheet's mobile layouts (max-width: 760px, and phones
// held sideways at max-height: 520px), where a single photo already fills the screen.
const ZOOM_QUERY = '(min-width: 761px) and (min-height: 521px)'
const subscribeToZoomQuery = (onChange: () => void) => {
  const query = window.matchMedia(ZOOM_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const zoomQueryMatches = () => window.matchMedia(ZOOM_QUERY).matches

/**
 * A strip of photos shown side by side that moves one photo per step. The stylesheet decides how
 * many photos fit at each breakpoint; a fractional count lets the next photo peek in at the edge.
 */
export function GalleryCarousel({ label, images, interval = 4000, className }: GalleryCarouselProps) {
  const stageId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDialogElement>(null)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const count = images.length

  const [perView, setPerView] = useState(1)
  const [current, setCurrent] = useState(0)
  // No photo is requested until the gallery comes within a screen of the viewport. From then on,
  // photos up to the furthest step reached plus the one right after it get their image requested,
  // so photos load one step ahead instead of all at once. (Native lazy loading can't do this:
  // it never fetches a photo waiting outside the clipped frame, so it would slide in blank.)
  const [near, setNear] = useState(false)
  const [furthest, setFurthest] = useState(0)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const zoomable = useSyncExternalStore(subscribeToZoomQuery, zoomQueryMatches, () => false)
  // Index of the photo shown enlarged in the lightbox, if any
  const [zoomed, setZoomed] = useState<number | null>(null)
  const zoomedImage = zoomed === null ? null : images[zoomed]

  // Offsets are measured in photos. The last step stops with the final photo flush against the
  // right edge rather than leaving an empty gap after it.
  const maxOffset = Math.max(0, count - perView)
  const steps = Math.ceil(maxOffset - EPSILON) + 1
  // Clamped so widening the window never leaves the strip past its end
  const step = Math.min(current, steps - 1)
  const offsetAt = (index: number) => Math.min(index, maxOffset)
  const fullyVisible = (offset: number) =>
    [Math.ceil(offset - EPSILON), Math.floor(offset + perView + EPSILON) - 1] as const
  const offset = offsetAt(step)
  const [firstVisible, lastVisible] = fullyVisible(offset)
  const lastToLoad = Math.ceil(offsetAt(Math.max(furthest, step)) + perView)

  // Autoplay only while the gallery is on screen and the visitor isn't pointing at it, navigating
  // it with the keyboard or looking at an enlarged photo.
  const autoplay = inView && !hovered && !keyboardFocused && zoomed === null && steps > 1

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const approach = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        approach.disconnect()
      },
      { rootMargin: '100% 0px' },
    )
    approach.observe(root)
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    visibility.observe(root)
    // Reports once on observe and again on every resize, which is when a breakpoint can change
    const size = new ResizeObserver(() => setPerView(readPerView(root)))
    size.observe(root)
    return () => {
      approach.disconnect()
      visibility.disconnect()
      size.disconnect()
    }
  }, [])

  // Re-armed on every step, so a manual step also restarts the countdown.
  useEffect(() => {
    if (!autoplay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => {
      const next = (step + 1) % steps
      setCurrent(next)
      setFurthest((previous) => Math.max(previous, next))
    }, interval)
    return () => window.clearTimeout(timer)
  }, [autoplay, step, steps, interval])

  // The dialog closes itself (Escape, backdrop click, close button) and reports back via onClose
  useEffect(() => {
    const lightbox = lightboxRef.current
    if (zoomed !== null && lightbox && !lightbox.open) lightbox.showModal()
  }, [zoomed])

  // Fetch the photos on either side of the enlarged one, so stepping to them shows them at once
  useEffect(() => {
    if (zoomed === null || count < 2) return
    for (const direction of [1, -1]) new Image().src = images[(zoomed + direction + count) % count].src
  }, [zoomed, count, images])

  // Browsing in the lightbox wraps around and leaves the carousel where it was, so focus returns
  // to the photo that opened it
  const zoomBy = (direction: number) =>
    setZoomed((previous) => (previous === null ? null : (previous + direction + count) % count))

  const goTo = (index: number) => {
    const next = (index + steps) % steps
    setCurrent(next)
    setFurthest((previous) => Math.max(previous, next))
  }

  return (
    <div
      ref={rootRef}
      className={className ? `gallery-carousel ${className}` : 'gallery-carousel'}
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
        className="gallery-carousel__viewport"
        role="region"
        aria-roledescription="carrusel"
        aria-label={label}
        aria-live={autoplay ? 'off' : 'polite'}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            goTo(step + (event.key === 'ArrowRight' ? 1 : -1))
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
          if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) goTo(step + (dx < 0 ? 1 : -1))
        }}
        onPointerCancel={() => {
          swipeStart.current = null
        }}
      >
        <div className="gallery-carousel__track" style={{ '--offset': offset } as CSSProperties}>
          {images.map((image, index) => {
            const hidden = index < firstVisible || index > lastVisible
            const photo = (
              <img
                src={image.src}
                alt={image.alt}
                decoding="async"
                draggable={false}
                style={image.position ? { objectPosition: image.position } : undefined}
              />
            )
            return (
              <div
                key={image.src}
                className="gallery-carousel__slide"
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${count}`}
                aria-hidden={hidden}
              >
                {near &&
                  index <= lastToLoad &&
                  (zoomable ? (
                    <button
                      type="button"
                      className="gallery-carousel__zoom"
                      aria-label={`Ampliar imagen: ${image.alt}`}
                      aria-haspopup="dialog"
                      tabIndex={hidden ? -1 : undefined}
                      onClick={() => setZoomed(index)}
                    >
                      {photo}
                    </button>
                  ) : (
                    photo
                  ))}
              </div>
            )
          })}
        </div>
      </div>

      {steps > 1 && (
        <div className="gallery-carousel__controls">
          <div className="gallery-carousel__segments">
            {Array.from({ length: steps }, (_, index) => {
              const [first, last] = fullyVisible(offsetAt(index))
              return (
                <button
                  key={index}
                  type="button"
                  className={`gallery-carousel__segment${index === step ? ' is-active' : ''}`}
                  aria-label={
                    first === last
                      ? `Ver imagen ${first + 1} de ${count}`
                      : `Ver imágenes ${first + 1} a ${last + 1} de ${count}`
                  }
                  aria-current={index === step ? 'true' : undefined}
                  aria-controls={stageId}
                  onClick={() => goTo(index)}
                />
              )
            })}
          </div>

          <div className="gallery-carousel__arrows">
            <button
              type="button"
              className="gallery-carousel__button gallery-carousel__button--prev"
              aria-controls={stageId}
              aria-label="Imagen anterior"
              onClick={() => goTo(step - 1)}
            >
              <ArrowIcon />
            </button>
            <button
              type="button"
              className="gallery-carousel__button"
              aria-controls={stageId}
              aria-label="Imagen siguiente"
              onClick={() => goTo(step + 1)}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      )}

      {/* Always mounted so an open lightbox survives the window shrinking to a mobile layout */}
      <dialog
        ref={lightboxRef}
        className="gallery-lightbox"
        aria-label="Imagen ampliada"
        onClose={() => setZoomed(null)}
        onClick={(event) => {
          // The dialog spans the whole screen, so a click on it rather than on the photo or a
          // button landed outside the photo
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        onKeyDown={(event) => {
          if (count < 2 || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return
          event.preventDefault()
          zoomBy(event.key === 'ArrowRight' ? 1 : -1)
        }}
      >
        <button
          type="button"
          className="gallery-lightbox__button gallery-lightbox__close"
          aria-label="Cerrar"
          onClick={() => lightboxRef.current?.close()}
        >
          <CloseIcon />
        </button>
        {count > 1 && (
          <>
            <button
              type="button"
              className="gallery-lightbox__button gallery-lightbox__nav gallery-lightbox__nav--prev"
              aria-label="Imagen anterior"
              onClick={() => zoomBy(-1)}
            >
              <ArrowIcon />
            </button>
            <button
              type="button"
              className="gallery-lightbox__button gallery-lightbox__nav gallery-lightbox__nav--next"
              aria-label="Imagen siguiente"
              onClick={() => zoomBy(1)}
            >
              <ArrowIcon />
            </button>
          </>
        )}
        {zoomed !== null && zoomedImage && (
          <>
            {/* Keyed so each photo replays the entrance instead of swapping in place */}
            <img key={zoomed} className="gallery-lightbox__image" src={zoomedImage.src} alt={zoomedImage.alt} />
            {count > 1 && (
              <p className="gallery-lightbox__counter" aria-live="polite">
                {zoomed + 1} / {count}
              </p>
            )}
          </>
        )}
      </dialog>
    </div>
  )
}
