import classes from "./input.module.scss";

/** Create logic:
 * User must enter all 4 fields (First name, Last name, email & message)
 * User must enter valid email
 */

export const Input = ({ children = "Please add text", type = "text" }) => {
  return (
    <div className={classes.inputWrapper}>
      <p className={classes.inputTitle}>{children}</p>
      <input className={classes.input} type={type} />
    </div>
  );
};

export const TextArea = ({ children }) => {
  return (
    <div className={classes.inputWrapper}>
      <p className={classes.inputTitle}>{children}</p>
      <textarea
        className={classes.input}
        placeholder="What can I help you with?"
      />
    </div>
  );
};
