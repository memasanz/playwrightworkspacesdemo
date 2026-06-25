import '../App.css'

type ThemeToggleProps = {
  isDarkMode: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="secondary"
      aria-pressed={isDarkMode}
      onClick={onToggle}
    >
      {isDarkMode ? 'Use light mode' : 'Use dark mode'}
    </button>
  )
}
