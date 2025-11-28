import classes from "./input.module.scss";

export const Input = ({
  id,
  type = "text",
  autoComplete,
  name,
  children = "Please add text",
}) => {
  const fieldName = name || id || type;

  if (!id) {
    console.error(
      "Input component requires an 'id' prop for stability and accessibility."
    );
    return null;
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        id={id}
        className={classes.input}
        type={type}
        name={fieldName}
        required
        autoComplete={autoComplete}
      />
      <label htmlFor={id} className={classes.inputTitle}>
        {children}
      </label>
    </div>
  );
};

export const TextArea = ({ children, id, name, autoComplete }) => {
  const fieldName = name || id || "message";
  if (!id) {
    console.error("TextArea component requires an 'id' prop.");
    return null;
  }

  return (
    <div className={classes.inputWrapper}>
      <textarea
        className={classes.input}
        placeholder="What can I help you with?"
        name={fieldName}
        id={id}
        autoComplete={autoComplete}
        required
      />
      <label htmlFor={id} className={classes.inputTitle}>
        {children}
      </label>
    </div>
  );
};
