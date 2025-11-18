import classes from "./quickViewButton.module.scss";

export const QuickViewButton = ({ onClick, text }) => {
  return (
    <button className={classes.quickViewButton} onClick={onClick}>
      {text || "Add text"}
    </button>
  );
};

export default QuickViewButton;
