import classes from "./pText.module.scss";

// <p> which is used inside of each <a> link
const PText = ({ children }) => {
  return <p className={classes.pText}>{children}</p>;
};

export default PText;
