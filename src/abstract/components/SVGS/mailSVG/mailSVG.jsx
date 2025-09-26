const MailSVG = ({ size = 24, className = "", title = "Mail" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    role="img"
    aria-label={title}
    fill="none"
  >
    <title>{title}</title>
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2 5 L12 13 L22 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

export default MailSVG;
