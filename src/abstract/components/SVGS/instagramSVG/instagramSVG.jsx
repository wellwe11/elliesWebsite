import classes from "./instagramSVG.module.scss";

const InstagramSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="black" />
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        rx="10"
        fill="none"
        stroke="white"
        strokeWidth="4"
      />
      <circle
        cx="50"
        cy="50"
        r="12"
        fill="none"
        stroke="white"
        strokeWidth="4"
      />
      <circle cx="65" cy="35" r="3" fill="white" />
    </svg>
  );
};

export default InstagramSVG;
