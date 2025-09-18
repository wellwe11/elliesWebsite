import classes from "./footer.module.scss";
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";

const Copyright = () => {};

const NavigationLinks = () => {
  const footerLinks = {
    "social media": {
      instagram: "someLink", // link to ellies socials (insta)
    },

    information: {
      "customer rights": "some link", // link to info-page and navigates to customer rights section
      shipping: "some link", // link to info-page and navigates to shipping section
    },

    business: {},
  };

  const email = "someEmail@somePlace.com", // links to contact: form
    adress = "somePlaceWhereILive", // just a text with ellies adress
    linkKeys = Object.keys(footerLinks);

  const socialsWrapper = (
    <div>
      {linkKeys.map((key, index) => {
        const keyKeys = Object.keys(footerLinks[key]);
        return (
          <div>
            <h6>{key}</h6>

            <div>
              {keyKeys.map((keyKey, index) => (
                <div>{keyKey}</div>
              ))}
            </div>
          </div>
        );
      })}
      <div>
        {email}
        {adress}
      </div>
    </div>
  );

  return socialsWrapper;
};

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.navContent}>
        <NavigationLinks />
        <h1 className={screen_classes.contentWrapper}>footer</h1>
      </div>
    </div>
  );
};

export default Footer;
