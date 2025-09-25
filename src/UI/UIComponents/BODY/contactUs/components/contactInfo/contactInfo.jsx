import classes from "./contactInfo.module.scss";

const ContactInfo = ({ children, title }) => {
  return (
    <div className={classes.contactInfo}>
      <div className={classes.titleWrapper}>
        <h6 className={classes.title}>{title}</h6>
      </div>
      <div className={classes.textWrapper}>
        <p className={classes.text}>{children}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
