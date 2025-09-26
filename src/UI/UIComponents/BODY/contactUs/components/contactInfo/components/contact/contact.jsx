import MailSVG from "@components/SVGS/mailSVG/mailSVG.jsx";
import classes from "./contact.module.scss";
import FollowSVG from "@components/SVGS/followSVG/followSVG.jsx";
import InstagramSVG from "@components/SVGS/instagramSVG/instagramSVG.jsx";
import FacebookSVG from "@components/SVGS/facebookSVG/facebookSVG.jsx";
import EtsySVG from "@components/SVGS/etsySVG/etsySVG.jsx";

const SVGWrapper = ({ children }) => {
  return <div className={classes.SVGWrapper}>{children}</div>;
};

const Section = ({ links, onClick, sectionSVG }) => {
  if (!links) return;

  console.log(links);

  return (
    <div className={classes.section}>
      <SVGWrapper>{sectionSVG}</SVGWrapper>
      {links.map((link, index) => (
        <a onClick={onClick} className={classes.link} key={index}>
          {link}
        </a>
      ))}
    </div>
  );
};

const Contact = () => {
  const emailWrapper = (
    <div className={classes.emailWrapper}>
      <Section
        sectionSVG={<MailSVG />}
        links={[<p>someEmail@atEmail.com</p>]}
      />
    </div>
  );

  const LocalSvgWrapper = ({ children }) => {
    return (
      <div className={classes.localSvgContainer}>
        {children.map((child) => (
          <div className={classes.svgWrapper}>{child}</div>
        ))}
      </div>
    );
  };

  const svgs = [
    <LocalSvgWrapper>
      <InstagramSVG />
      <EtsySVG />
      <FacebookSVG />
    </LocalSvgWrapper>,
  ];

  const socialsWrapper = (
    <div className={classes.socialMediaWrapper}>
      <Section links={svgs} sectionSVG={<FollowSVG />} />
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
