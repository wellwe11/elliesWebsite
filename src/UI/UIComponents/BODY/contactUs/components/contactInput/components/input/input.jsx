import classes from "./input.module.scss";

/** Create logic:
 * User must enter all 4 fields (First name, Last name, email & message)
 * User must enter valid email
 */

export const Input = ({ children = "Please add text", type = "text" }) => {
  return (
    <div className={classes.inputWrapper}>
      <input className={classes.input} type={type} required />
      <label htmlFor={children} className={classes.inputTitle}>
        <p>{children}</p>
      </label>
    </div>
  );
};

export const TextArea = ({ children }) => {
  return (
    <div className={classes.inputWrapper}>
      <textarea
        className={classes.input}
        placeholder="What can I help you with?"
        requireds
      />
      <label htmlFor={children} className={classes.inputTitle}>
        <p>{children}</p>
      </label>
    </div>
  );
};
