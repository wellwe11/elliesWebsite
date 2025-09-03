import classes from "./whiteButtonCenterText.module.scss";

export const WhiteButtonCenterText = ({ onClick, text }) => {
  return onClick ? (
    <button className={classes.quickViewButton} onClick={onClick}>
      {text || "Add text"}
    </button>
  ) : (
    <button className={classes.quickViewButton}>{text || "Add text"}</button>
  );
};

export default WhiteButtonCenterText;
