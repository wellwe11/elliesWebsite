import { capitalizeAllFirstLetters } from "../../../abstract/functions/firstLetterCapital.js";
import classes from "./footer.module.scss";
import GitHubSVG from "@components/SVGS/githubSVG/githubSVG";

// importing screen-sizings to help navbar scale with body
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";
import { useNavigate } from "react-router-dom";

const PText = ({ children }) => {
  return <p className={classes.pText}>{children}</p>;
};

const ALink = ({ children, href = "blank" }) => {
  return (
    <a
      className={classes.linkButton}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className={classes.copyrightWrapper}>
      <PText>{`Copyright © ${year} @wellwe11`}</PText>
    </div>
  );
};

const GithubLink = () => {
  return (
    <div className={classes.gitHubWrapper}>
      <div
        className={`${screen_classes.contentWrapper} ${classes.gitHubContentWrapper}`}
      >
        <div className={classes.buttonWrapper}>
          <ALink>
            <div className={classes.content}>
              <PText>Github</PText>
              <div className={classes.svgWrapper}>
                <GitHubSVG />
              </div>
            </div>
          </ALink>
        </div>
      </div>
    </div>
  );
};

const NavigationLinks = () => {
  const navigate = useNavigate();
  const footerLinks = {
    "social media": {
      instagram: "someLink", // link to ellies socials (insta)
    },

    information: {
      "customer rights": "some link", // link to info-page and navigates to customer rights section
      shipping: "some link", // link to info-page and navigates to shipping section
    },
  };

  const contactTitle = "Contact",
    email = "someEmail@somePlace.com", // links to contact: form
    adress = "somePlaceWhereILive", // just a text with ellies adress
    linkKeys = Object.keys(footerLinks);

  const linksWrapper = linkKeys.map((key, index) => {
    // dynamic wrapper with keys & values
    const keyKeys = Object.keys(footerLinks[key]);

    return (
      <div key={index} className={classes.sectionWrapper}>
        <h6 className={classes.title}>{capitalizeAllFirstLetters(key)}</h6>

        <div className={classes.buttonsContainer}>
          {keyKeys.map((keyKey, index) => (
            <div key={`${index} ${keyKey}`} className={classes.buttonWrapper}>
              <ALink href={footerLinks[key][keyKey]}>
                <PText>{capitalizeAllFirstLetters(keyKey)}</PText>
              </ALink>
            </div>
          ))}
        </div>
      </div>
    );
  });

  const contactWrapper = (
    // static wrapper with contactTitle, email & adress
    <div className={classes.sectionWrapper}>
      <h6 className={classes.title}>{contactTitle}</h6>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttonWrapper}>
          <ALink>
            <PText>{capitalizeAllFirstLetters(email)}</PText>
          </ALink>
        </div>
        <div className={classes.buttonWrapper}>
          <ALink>
            <PText>{capitalizeAllFirstLetters(adress)}</PText>
          </ALink>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.linksWrapper}>
      {linksWrapper}
      {contactWrapper}
    </div>
  );
};

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={`${screen_classes.contentWrapper} ${classes.navContent}`}>
        <NavigationLinks />
        <Copyright />
        <GithubLink />
      </div>
    </div>
  );
};

export default Footer;
