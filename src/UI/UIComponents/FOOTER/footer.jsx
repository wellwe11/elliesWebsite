import classes from "./footer.module.scss";
import GitHubSVG from "@components/SVGS/githubSVG/githubSVG";

const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className={classes.copyRightWrapper}>
      <p>{`Copyright © ${year} wellwe11`}</p>
    </div>
  );
};

const GithubLink = () => {
  return (
    <div className={classes.gitHubWrapper}>
      <div className={classes.buttonWrapper}>
        <LinkButton>
          <div className={classes.content}>
            Github
            <div className={classes.svgWrapper}>
              <GitHubSVG />
            </div>
          </div>
        </LinkButton>
      </div>
    </div>
  );
};

const LinkButton = ({ children, onClick }) => {
  return (
    <button className={classes.linkButton} onClick={onClick}>
      <p className={classes.buttonText}>{children}</p>
    </button>
  );
};

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

  const linksWrapper = (
    <div className={classes.linksWrapper}>
      {linkKeys.map((key, index) => {
        const keyKeys = Object.keys(footerLinks[key]);
        return (
          <div key={index} className={classes.sectionWrapper}>
            <h6 className={classes.title}>{key}</h6>

            <div className={classes.buttonsContainer}>
              {keyKeys.map((keyKey, index) => (
                <div
                  key={`${index} ${keyKey}`}
                  className={classes.buttonWrapper}
                >
                  <LinkButton>{keyKey}</LinkButton>
                </div>
              ))}
              <div className={classes.buttonWrapper}>
                <LinkButton>{email}</LinkButton>
              </div>
              <div className={classes.buttonWrapper}>
                <LinkButton>{adress}</LinkButton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return linksWrapper;
};

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.navContent}>
        <NavigationLinks />
        <Copyright />
        <GithubLink />
      </div>
    </div>
  );
};

export default Footer;
