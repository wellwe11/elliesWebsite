import { Link } from "react-router-dom";
import classes from "./exploreNewIn.module.scss";
import placeholderImage from "/frontPage/colorsPlaceholder.jpg";

const placeholderTitle = `Prints`;
const placeholderText = `Here at art & cards. co, we aim to transport you to a world full of happiness, colour and wonder in the form of beautifully Illustrated Wall Art, Homewares and Accessories.`;
const placeholderBio = `Dive in & explore the world of art with paintings and prints.`;

const ExploreButton = ({ children = "add text", link = "/gallery?page=1" }) => {
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
  linkText,
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
          <ExploreButton link={link}>{linkText}</ExploreButton>
        </div>
      </div>
    </div>
  );
};

export default ExploreNewIn;
