import classes from "./navButton.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

const NavButton = ({ children, link }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(link);
  return (
    <button className={classes.navButton} onClick={handleNavigate}>
      <h6 className={classes.font}>{children}</h6>
    </button>
  );
};

export default NavButton;
