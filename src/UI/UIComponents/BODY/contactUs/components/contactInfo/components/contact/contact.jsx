import classes from "./contact.module.scss";

const Contact = () => {
  const emailWrapper = (
    <div className={classes.emailWrapper}>
      <a className={classes.link}>
        <p className={classes.text}>someEmail@emailAddress.com</p>
      </a>
    </div>
  );

  const socialsWrapper = (
    <div className={classes.socialMediaWrapper}>
      <div className={classes.socialMediaLinks}>
        <h6>Social medias</h6>
      </div>
    </div>
  );

  return (
    <div className={classes.contact}>
      {emailWrapper}
      {socialsWrapper}
    </div>
  );
};
export default Contact;
