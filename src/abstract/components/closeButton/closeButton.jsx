import classes from "./closeButton.module.scss";
import X_SVG from "../SVGS/X_SVG/X_SVG.jsx";

import { Link } from "react-router-dom";
import bodyNoScroll from "@functions/bodyNoScroll.js";

const CloseButton = ({ to = -1 }) => {
  const { enableScroll } = bodyNoScroll();

  return (
    <Link to={to} className={classes.closeButton} onClick={enableScroll}>
      <X_SVG />
    </Link>
  );
};

export default CloseButton;
