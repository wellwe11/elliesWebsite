import { Link } from "react-router-dom";
import classes from "./exploreNewIn.module.scss";
import placeholderImage from "/frontPage/colorsPlaceholder.jpg";

const placeholderTitle = `Prints`;
const placeholderText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`;
const placeholderBio = `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const ExploreButton = ({ children, link = "/gallery?page=1" }) => {
  return (
    <Link className={classes.link} to={link}>
      <h6 className={classes.text}>{children}</h6>
    </Link>
  );
};

const ExploreNewIn = ({
  title = placeholderTitle,
  text = placeholderText,
  bio = placeholderBio,
  img = placeholderImage,
  link,
}) => {
  return (
    <div className={classes.exploreNewIn}>
      <div className={classes.sideWrapper}>
        <div className={classes.left}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={img} alt="" />
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.textContainer}>
            <h5 className={classes.title}>{title}</h5>
            <p className={classes.text}>{text}</p>
            <p className={classes.bio}>{bio}</p>
          </div>
          <ExploreButton link={link}>Explore</ExploreButton>
        </div>
      </div>
    </div>
  );
};

export default ExploreNewIn;
