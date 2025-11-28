import classes from "./contactInputs.module.scss";

import { Input, TextArea } from "./components/input/input.jsx";

const ContactInputs = () => {
  const inputsWrapper = (
    <form className={classes.inputsWrapper}>
      <div className={classes.inputsContainer}>
        <div className={`${classes.firstNameWrapper} ${classes.halfInput}`}>
          <Input id="user-name" autoComplete="given-name">
            First name
          </Input>
        </div>
        <div className={`${classes.lastNameWrapper} ${classes.halfInput}`}>
          <Input id={"user-lastName"} autoComplete="family-name">
            Last name
          </Input>
        </div>
      </div>

      <div className={classes.inputsContainer}>
        <div className={`${classes.emailWrapper} ${classes.wholeInput}`}>
          <Input type="email" id="userEmail" autoComplete="email">
            Email
          </Input>
        </div>
      </div>

      <div className={classes.inputsContainer}>
        <div className={`${classes.messageWrapper} ${classes.wholeInput}`}>
          <TextArea autoComplete="off" id="user-message">
            Message
          </TextArea>
        </div>
      </div>
      <div className={classes.inputsContainer}>
        <button
          className={`${classes.button} ${classes.wholeInput}`}
          type="submit"
          id="submitBtn"
          name="submitButton"
        >
          Submit
        </button>
      </div>
    </form>
  );

  return <div className={classes.inputs}>{inputsWrapper}</div>;
};

export default ContactInputs;
