import { useEffect, useRef, type MouseEvent, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type LightboxPhoto = { file: string; alt: string; width: number; height: number }
export type LightboxLabels = { dialog: string; close: string; previous: string; next: string }

const fullImage = (file: string, width: number) => `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=85`

export function Lightbox({ photos, index, labels, onClose, onNavigate }: {
  photos: LightboxPhoto[]
  index: number | null
  labels: LightboxLabels
  onClose: () => void
  onNavigate: (step: number) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const photo = index === null ? null : photos[index] ?? null
  const isOpen = photo !== null
  const hasSiblings = photos.length > 1

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (isOpen) {
      if (!element.open) {
        returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
        element.showModal()
      }
      return
    }
    if (element.open) element.close()
    returnFocus.current?.focus({ preventScroll: true })
    returnFocus.current = null
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !hasSiblings) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onNavigate(1)
      if (event.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, hasSiblings, onNavigate])

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const target = event.target as HTMLElement
    if (target.tagName !== 'IMG' && !target.closest('button')) onClose()
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStartX.current
    touchStartX.current = null
    if (start === null || !hasSiblings) return
    const distance = event.changedTouches[0].clientX - start
    if (Math.abs(distance) > 50) onNavigate(distance < 0 ? 1 : -1)
  }

  return <dialog ref={dialog} className="lightbox" aria-label={labels.dialog} onClose={onClose} onClick={handleBackdropClick}>
    {photo && index !== null && <>
      <figure className="lightbox-figure" onTouchStart={event => { touchStartX.current = event.touches[0].clientX }} onTouchEnd={handleTouchEnd}>
        <img key={photo.file} src={fullImage(photo.file, 1600)} srcSet={`${fullImage(photo.file, 900)} 900w, ${fullImage(photo.file, 1600)} 1600w`} sizes="(max-width: 700px) 100vw, 80vw" alt={photo.alt} width={photo.width} height={photo.height} />
        <figcaption><span>{photo.alt}</span>{hasSiblings && <span className="lightbox-count">{index + 1} / {photos.length}</span>}</figcaption>
      </figure>
      <button type="button" className="lightbox-button lightbox-close" onClick={onClose} aria-label={labels.close}><X size={22} aria-hidden="true" /></button>
      {hasSiblings && <>
        <button type="button" className="lightbox-button lightbox-prev" onClick={() => onNavigate(-1)} aria-label={labels.previous}><ChevronLeft size={26} aria-hidden="true" /></button>
        <button type="button" className="lightbox-button lightbox-next" onClick={() => onNavigate(1)} aria-label={labels.next}><ChevronRight size={26} aria-hidden="true" /></button>
      </>}
    </>}
  </dialog>
}
