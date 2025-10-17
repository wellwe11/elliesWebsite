import classes from "./contactInfo.module.scss";

import Contact from "./components/contact/contact.jsx";
import Info from "./components/info/info.jsx";

const ContactInfo = () => {
  return (
    <div className={classes.contactInfoWrapper}>
      <Info />
      <Contact />
    </div>
  );
};

export default ContactInfo;
