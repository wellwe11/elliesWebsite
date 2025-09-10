import classes from "./BUTTONWITHCONTENT.module.scss";

const ButtonWithContent = ({ children, fontType = "h3" }) => {
  const FontType = fontType;
  return (
    <button className={classes.buttonWithContent}>
      <div className={classes.childrenWrapper}>
        <FontType className={classes.font}>{children}</FontType>
      </div>
    </button>
  );
};

export default ButtonWithContent;
