import classes from "./contactInputs.module.scss";

import Input from "./components/input/input.jsx";

const ContactInputs = () => {
  const firstNameWrapper = (
    <div className={`${classes.firstNameWrapper} ${classes.halfInput}`}>
      <Input />
    </div>
  );

  const lastNameWrapper = (
    <div className={`${classes.lastNameWrapper} ${classes.halfInput}`}>
      <Input />
    </div>
  );

  const emailWrapper = (
    <div className={`${classes.emailWrapper} ${classes.wholeInput}`}>
      <Input />
    </div>
  );

  const messageWrapper = (
    <div className={`${classes.messageWrapper} ${classes.wholeInput}`}>
      <Input />
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
