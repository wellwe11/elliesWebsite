import classes from "./X_SVG.module.scss";

const X_SVG = () => {
  return (
    <svg
      className={classes.X_SVG}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Close"
      focusable="false"
    >
      <rect
        x="0"
        y="0"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0"
        rx="0"
        ry="0"
      />

      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="M6 6 L18 18" />
        <path d="M18 6 L6 18" />
      </g>
    </svg>
  );
};

export default X_SVG;
