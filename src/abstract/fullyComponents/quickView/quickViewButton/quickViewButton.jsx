import classes from "./quickViewButton.module.scss";

export const QuickViewButton = ({ onClick, text }) => {
  return onClick ? (
    <button className={classes.quickViewButton} onClick={onClick}>
      {text || "Add text"}
    </button>
  ) : (
    <button className={classes.quickViewButton}>{text || "Add text"}</button>
  );
};

export default QuickViewButton;
