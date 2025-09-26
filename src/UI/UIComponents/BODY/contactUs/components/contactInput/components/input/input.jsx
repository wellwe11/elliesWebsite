import classes from "./input.module.scss";

const Input = ({ children = "Please add text", type = "text" }) => {
  return (
    <div className={classes.inputWrapper}>
      <p className={classes.inputTitle}>{children}</p>
      <input className={classes.input} type={type} />
    </div>
  );
};

export default Input;
