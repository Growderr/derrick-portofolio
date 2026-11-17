/**
 * Scrolls to the top of the page and moves keyboard focus to the main landmark,
 * so the next Tab press starts from the top of the content instead of wherever
 * the user was before. The scroll itself follows `scroll-behavior` in base.css:
 * smooth normally, instant under prefers-reduced-motion.
 */
export function scrollToTop() {
  window.scrollTo({ top: 0 })
  document.getElementById('main')?.focus({ preventScroll: true })
}
