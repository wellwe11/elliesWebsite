import classes from "./BUTTONWITHCONTENT.module.scss";

const ButtonWithContent = ({ children }) => {
  return (
    <button className={classes.buttonWithContent}>
      <div className={classes.childrenWrapper}>
        <p>{children}</p>
      </div>
    </button>
  );
};

export default ButtonWithContent;
