// The square SVG keeps this backdrop circular in both tall and wide layouts.
export default function ThankYouBackdrop() {
  return <svg className="thank-you-backdrop" viewBox="0 0 640 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <circle cx="320" cy="320" r="295" fill="#fff9e9"/>
  </svg>
}
