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
  const linksEntries = Object.entries(links);

  console.log(linksEntries);

  return (
    <div className={classes.section}>
      <SVGWrapper>{sectionSVG}</SVGWrapper>
      <div className={classes.sectionWrapper}>
        {linksEntries.map(([entry, obj], index) => (
          <a onClick={onClick} className={classes.link} key={index}>
            {obj.svg || obj.text}
          </a>
        ))}
      </div>
    </div>
  );
};

const LocalSvgWrapper = ({ svg }) => {
  return (
    <div className={classes.localSvgContainer}>
      <div className={classes.svgWrapper}>{svg}</div>
    </div>
  );
};

const Contact = () => {
  const emailContact = {
      email: {
        text: <p>someEmail@someMail.com</p>,
        link: "",
      },
    },
    contactObject = {
      instagram: {
        svg: <LocalSvgWrapper svg={<InstagramSVG />} />,
        link: "",
      },
      facebook: {
        svg: <LocalSvgWrapper svg={<FacebookSVG />} />,
        link: "",
      },
      etsy: {
        svg: <LocalSvgWrapper svg={<EtsySVG />} />,
        link: "",
      },
    };

  const emailWrapper = (
    <div className={classes.emailWrapper}>
      <Section links={emailContact} sectionSVG={<MailSVG />} />
    </div>
  );

  const socialsWrapper = (
    <div className={classes.socialMediaWrapper}>
      <Section links={contactObject} sectionSVG={<FollowSVG />} />
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
