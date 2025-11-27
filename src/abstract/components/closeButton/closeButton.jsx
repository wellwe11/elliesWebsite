import classes from "./closeButton.module.scss";
import X_SVG from "../SVGS/X_SVG/X_SVG.jsx";

import { Link } from "react-router-dom";

const CloseButton = ({ to, onClick }) => {
  return to ? (
    <Link to={to} className={classes.closeButton} onClick={onClick}>
      <X_SVG />
    </Link>
  ) : (
    <button className={classes.closeButton} onClick={onClick}>
      <X_SVG />
    </button>
  );
};

export default CloseButton;
