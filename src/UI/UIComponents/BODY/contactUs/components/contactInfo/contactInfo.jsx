import classes from "./contactInfo.module.scss";

const ContactInfo = () => {
  const title = (
    <div className={classes.titleWrapper}>
      <h1 className={classes.title}>Get in Touch</h1>
    </div>
  );

  const bioHeader = (
    <div className={classes.bioHeader}>
      <h5 className={classes.text}>I'd like to hear from you!</h5>
    </div>
  );

  const bioText = (
    <div className={classes.bioText}>
      <p>
        If you have any inquiries or just want to say hi, please use the contact
        form.
      </p>
    </div>
  );

  const infoWrapper = (
    <div className={classes.infoWrapper}>
      {title}
      {bioHeader}
      {bioText}
    </div>
  );

  return infoWrapper;
};

export default ContactInfo;
