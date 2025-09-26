import classes from "./input.module.scss";

const Input = ({ children = "Please add text", type = "text" }) => {
  return (
    <div className={classes.inputWrapper}>
      <h6 className={classes.inputTitle}>{children}</h6>
      <input className={classes.input} type={type} />
    </div>
  );
};

export default Input;
