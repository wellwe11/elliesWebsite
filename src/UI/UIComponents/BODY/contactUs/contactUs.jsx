import classes from "./contactUs.module.scss";

import ContactInfo from "./components/contactInfo/contactInfo.jsx";
import ContactInput from "./components/contactInput/contactInput.jsx";

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
  const contactWrapper = (
    <div className={classes.contactWrapper}>
      <ContactInfo title={"Contact"}>someEmail@email.com</ContactInfo>
    </div>
  );

  const addressWrapper = (
    <div className={classes.addressWrapper}>
      <ContactInfo title={"Based in"}>`Some City Some country `</ContactInfo>
    </div>
  );

  return (
    <div className={classes.infoWrapper}>
      {contactWrapper}
      {addressWrapper}
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
