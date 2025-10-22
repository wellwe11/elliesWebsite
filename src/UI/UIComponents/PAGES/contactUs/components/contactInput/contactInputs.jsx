import classes from "./contactInputs.module.scss";

import { Input, TextArea } from "./components/input/input.jsx";

const ContactInputs = () => {
  const inputsWrapper = (
    <form className={classes.inputsWrapper}>
      <div className={classes.inputsContainer}>
        <div className={`${classes.firstNameWrapper} ${classes.halfInput}`}>
          <Input>First name</Input>
        </div>
        <div className={`${classes.lastNameWrapper} ${classes.halfInput}`}>
          <Input>Last name</Input>
        </div>
      </div>

      <div className={classes.inputsContainer}>
        <div className={`${classes.emailWrapper} ${classes.wholeInput}`}>
          <Input type="email">Email</Input>
        </div>
      </div>

      <div className={classes.inputsContainer}>
        <div className={`${classes.messageWrapper} ${classes.wholeInput}`}>
          <TextArea>Message</TextArea>
        </div>
      </div>
      <div className={classes.inputsContainer}>
        <button
          className={`${classes.button} ${classes.wholeInput}`}
          type="submit"
        >
          <p>Submit</p>
        </button>
      </div>
    </form>
  );

  return <div className={classes.inputs}>{inputsWrapper}</div>;
};

export default ContactInputs;
