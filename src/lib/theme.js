/*
 * Theme architecture (prepared, not yet user-facing).
 *
 * Colors are CSS variables (see styles/tokens.css). The dark values live under
 * [data-theme="dark"]. A later phase only needs to call setTheme() from a toggle
 * and optionally persist the choice.
 */
export const THEMES = Object.freeze({ light: 'light', dark: 'dark' })
export const DEFAULT_THEME = THEMES.light

export function setTheme(theme = DEFAULT_THEME) {
  document.documentElement.dataset.theme = theme
}
