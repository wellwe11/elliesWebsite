import classes from "./info.module.scss";

const Info = () => {
  const title = (
    <div className={classes.titleWrapper}>
      <h1 className={classes.title}>Get in Touch</h1>
    </div>
  );

  const bioHeader = (
    <div className={classes.bioHeader}>
      <h6 className={classes.text}>I'd like to hear from you!</h6>
    </div>
  );

  const bioText = (
    <div className={classes.bioText}>
      <p className={classes.text}>
        If you have any inquiries or just want to say hi, please use the contact
        form.
      </p>
    </div>
  );

  return (
    <div className={classes.info}>
      {title}
      {bioHeader}
      {bioText}
    </div>
  );
};

export default Info;
