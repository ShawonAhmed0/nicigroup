/**
 * The group mark: three bars, one per operating business, rising together.
 * Drawn rather than typed, and generated from nothing — it carries the one
 * fact the group is actually selling, which is its breadth.
 */
export function GroupMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="3" fill="currentColor" />
      <rect x="6" y="17" width="5" height="9" rx="1" fill="var(--build)" />
      <rect x="13.5" y="12" width="5" height="14" rx="1" fill="var(--paper)" />
      <rect x="21" y="6" width="5" height="20" rx="1" fill="var(--mobility)" />
    </svg>
  )
}
