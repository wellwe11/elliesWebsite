import classes from "./contactUs.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import ContactInfo from "./components/contactInfo/contactInfo.jsx";
import ContactInputs from "./components/contactInput/contactInputs.jsx";

const ContactUs = () => {
  return (
    <div className={`${classes.contactUs} ${fadeInClass.fade_in_on_load}`}>
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
