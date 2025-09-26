const FollowSVG = ({ size = 24, className = "", title = "Follow" }) => (
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
    {/* User head */}
    <circle
      cx="9"
      cy="8"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* User body */}
    <path
      d="M4 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Plus sign */}
    <line
      x1="17"
      y1="11"
      x2="23"
      y2="11"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="8"
      x2="20"
      y2="14"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export default FollowSVG;
