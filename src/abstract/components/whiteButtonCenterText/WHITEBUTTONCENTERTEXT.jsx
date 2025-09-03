import classes from "./whiteButtonCenterText.module.scss";

export const WhiteButtonCenterText = ({ onClick, text }) => {
  return onClick ? (
    <button className={classes.quickViewButton} onClick={onClick}>
      <h4 className={classes.quickViewText}>{text || "Add text"}</h4>
    </button>
  ) : (
    <button className={classes.quickViewButton}>
      <h4 className={classes.quickViewText}>{text || "Add text"}</h4>
    </button>
  );
};

export default WhiteButtonCenterText;
