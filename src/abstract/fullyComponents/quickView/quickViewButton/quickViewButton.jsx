import classes from "./quickViewButton.module.scss";

export const QuickViewButton = ({ onClick, text }) => {
  return (
    <button className={classes.quickViewButton} onClick={onClick}>
      <p>{text || "Add text"}</p>
    </button>
  );
};

export default QuickViewButton;
