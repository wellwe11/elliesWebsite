import classes from "./arrowRoundEdgesSVG.module.scss";

const ArrowRoundEdgesSVG = () => {
  return (
    <svg
      className={classes.ArrowRoundEdgesSVG}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="140"
        y1="40"
        x2="60"
        y2="100"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="100"
        x2="140"
        y2="160"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowRoundEdgesSVG;
