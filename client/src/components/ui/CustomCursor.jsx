import { useEffect, useRef } from 'react'

const TEXT_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]), textarea, [contenteditable="true"]'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, label, select, input, [data-cursor="hover"]'

const DOT_SPEED = 26
const RING_SPEED = 13

/**
 * Two-layer pointer effect: a quick dot and a slower ring.
 * Only runs for fine pointers with motion allowed, so touch devices and
 * reduced-motion users keep their native cursor untouched.
 */
export default function CustomCursor() {
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!root || !dot || !ring) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let active = false
    let running = false
    let frame = 0
    let lastTime = 0
    let moved = false

    const pointer = { x: 0, y: 0 }
    const dotPosition = { x: 0, y: 0 }
    const ringPosition = { x: 0, y: 0 }

    function paint() {
      dot.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0)`
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`
    }

    function settle() {
      const dotOffset = Math.abs(pointer.x - dotPosition.x) + Math.abs(pointer.y - dotPosition.y)
      const ringOffset = Math.abs(pointer.x - ringPosition.x) + Math.abs(pointer.y - ringPosition.y)

      if (dotOffset < 0.05 && ringOffset < 0.05) {
        dotPosition.x = ringPosition.x = pointer.x
        dotPosition.y = ringPosition.y = pointer.y
        paint()
        running = false
        return
      }

      frame = requestAnimationFrame(tick)
    }

    function tick(now = performance.now()) {
      const delta = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const dotEase = 1 - Math.exp(-DOT_SPEED * delta)
      const ringEase = 1 - Math.exp(-RING_SPEED * delta)

      dotPosition.x += (pointer.x - dotPosition.x) * dotEase
      dotPosition.y += (pointer.y - dotPosition.y) * dotEase
      ringPosition.x += (pointer.x - ringPosition.x) * ringEase
      ringPosition.y += (pointer.y - ringPosition.y) * ringEase

      paint()
      settle()
    }

    function start() {
      if (running) return
      running = true
      lastTime = performance.now()
      frame = requestAnimationFrame(tick)
    }

    function handleMove(event) {
      pointer.x = event.clientX
      pointer.y = event.clientY

      if (!moved) {
        moved = true
        dotPosition.x = ringPosition.x = pointer.x
        dotPosition.y = ringPosition.y = pointer.y
        paint()
        root.classList.add('is-visible')
      }

      start()
    }

    function handleOver(event) {
      const target = event.target
      if (!(target instanceof Element)) return

      const isText = Boolean(target.closest(TEXT_SELECTOR))
      const isInteractive = Boolean(target.closest(INTERACTIVE_SELECTOR))

      root.classList.toggle('is-text', isText)
      root.classList.toggle('is-hover', !isText && isInteractive)
    }

    function press() {
      root.classList.add('is-pressed')
    }

    function release() {
      root.classList.remove('is-pressed')
    }

    function hide() {
      moved = false
      root.classList.remove('is-visible', 'is-hover', 'is-text', 'is-pressed')
    }

    function enable() {
      if (active) return
      active = true
      document.documentElement.classList.add('has-custom-cursor')
      window.addEventListener('pointermove', handleMove, { passive: true })
      window.addEventListener('pointerdown', press, { passive: true })
      window.addEventListener('pointerup', release, { passive: true })
      window.addEventListener('pointercancel', release, { passive: true })
      window.addEventListener('blur', hide)
      document.addEventListener('pointerover', handleOver, { passive: true })
      document.documentElement.addEventListener('mouseleave', hide)
    }

    function disable() {
      if (!active) return
      active = false
      moved = false
      running = false
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('has-custom-cursor')
      root.classList.remove('is-visible', 'is-hover', 'is-text', 'is-pressed')
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
      window.removeEventListener('blur', hide)
      document.removeEventListener('pointerover', handleOver)
      document.documentElement.removeEventListener('mouseleave', hide)
      dot.style.transform = ''
      ring.style.transform = ''
    }

    function sync() {
      if (finePointer.matches && !reducedMotion.matches) enable()
      else disable()
    }

    finePointer.addEventListener('change', sync)
    reducedMotion.addEventListener('change', sync)
    sync()

    return () => {
      finePointer.removeEventListener('change', sync)
      reducedMotion.removeEventListener('change', sync)
      disable()
    }
  }, [])

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor__dot" ref={dotRef}>
        <span className="cursor__dot-core" />
      </div>
      <div className="cursor__ring" ref={ringRef}>
        <span className="cursor__ring-core" />
      </div>
    </div>
  )
}
