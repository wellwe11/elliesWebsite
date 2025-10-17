import classes from "./contactUs.module.scss";

import ContactInfo from "./components/contactInfo/contactInfo.jsx";
import ContactInputs from "./components/contactInput/contactInputs.jsx";

const ContactUs = () => {
  return (
    <div className={classes.contactUs}>
      <div className={classes.infoSection}>
        <ContactInfo />
      </div>
      <div className={classes.inputsSection}>
        <ContactInputs />
      </div>
    </div>
  );
};

export default ContactUs;
