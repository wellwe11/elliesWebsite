import classes from "./contactInputs.module.scss";

import { Input, TextArea } from "./components/input/input.jsx";

const ContactInputs = () => {
  const firstNameWrapper = (
    <div className={`${classes.firstNameWrapper} ${classes.halfInput}`}>
      <Input>First name</Input>
    </div>
  );

  const lastNameWrapper = (
    <div className={`${classes.lastNameWrapper} ${classes.halfInput}`}>
      <Input>Last name</Input>
    </div>
  );

  const emailWrapper = (
    <div className={`${classes.emailWrapper} ${classes.wholeInput}`}>
      <Input type="email">Email</Input>
    </div>
  );

  const messageWrapper = (
    <div className={`${classes.messageWrapper} ${classes.wholeInput}`}>
      <TextArea>Message</TextArea>
    </div>
  );

  const inputsWrapper = (
    <div className={classes.inputsWrapper}>
      <div className={classes.inputsContainer}>
        {firstNameWrapper}
        {lastNameWrapper}
      </div>

      <div className={classes.inputsContainer}>{emailWrapper}</div>

      <div className={classes.inputsContainer}>{messageWrapper}</div>
    </div>
  );

  return <div className={classes.inputs}>{inputsWrapper}</div>;
};

export default ContactInputs;
