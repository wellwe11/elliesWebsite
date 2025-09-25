import classes from "./uniqueButton.module.scss";

const uniqueButton = ({ text, children, fontType = "h6", onClick }) => {
  // button sharing same classes and structure
  const FontType = fontType;
  return (
    <button className={classes.button} onClick={onClick}>
      <div className={classes.textWrapper}>
        {children}
        <FontType className={classes.text}>{text}</FontType>
      </div>
    </button>
  );
};

export default uniqueButton;
