import classes from "./aLink.module.scss";

// common <a> element for linking to various websites on footer
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

export default ALink;
