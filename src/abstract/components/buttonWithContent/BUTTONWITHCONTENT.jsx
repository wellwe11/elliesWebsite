import classes from "./BUTTONWITHCONTENT.module.scss";

const ButtonWithContent = ({ children, fontType = "h3", onClick }) => {
  const FontType = fontType;
  return (
    <button className={classes.buttonWithContent} onClick={onClick}>
      <div className={classes.childrenWrapper}>
        <FontType className={classes.font}>{children}</FontType>
      </div>
    </button>
  );
};

export default ButtonWithContent;
