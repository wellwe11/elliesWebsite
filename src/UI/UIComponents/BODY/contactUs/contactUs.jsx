import classes from "./contactUs.module.scss";

const ContactInput = ({ children = "Please add text", type = "text" }) => {
  return (
    <div className={classes.inputWrapper}>
      <h6 className={classes.inputTitle}>{children}</h6>
      <input className={classes.input} type={type} />
    </div>
  );
};

const ContactInfo = ({ children, title }) => {
  return (
    <div>
      <div>
        <h6>{title}</h6>
      </div>
      <div>
        <p>{children}</p>
      </div>
    </div>
  );
};

const InputsWrapper = () => {
  const fullNameWrapper = (
    <div className={classes.fullNameContainer}>
      <ContactInput />
    </div>
  );

  const emailWrapper = (
    <div className={classes.emailContainer}>
      <ContactInput />
    </div>
  );

  const messageWrapper = (
    <div className={classes.messageContainer}>
      <ContactInput />
    </div>
  );

  return (
    <div className={classes.inputsWrapper}>
      {fullNameWrapper}
      {emailWrapper}
      {messageWrapper}
    </div>
  );
};

const InfoWrapper = () => {
  const contact = (
    <div className={classes.contactWrapper}>
      <ContactInfo title={"Contact"}>someEmail@email.com</ContactInfo>
    </div>
  );

  const adress = (
    <div className={classes.adressWrapper}>
      <ContactInfo title={"Based in"}>`Some City Some country `</ContactInfo>
    </div>
  );

  return (
    <div className={classes.infoWrapper}>
      {contact}
      {adress}
    </div>
  );
};

const ContactUs = () => {
  const titleWrapper = (
    <div className={classes.titleWrapper}>
      <h1 className={classes.title}>Contact Us</h1>
    </div>
  );

  return (
    <div className={classes.contactUs}>
      {titleWrapper}
      <div>
        <InputsWrapper />
        <InfoWrapper />
      </div>
    </div>
  );
};

export default ContactUs;
