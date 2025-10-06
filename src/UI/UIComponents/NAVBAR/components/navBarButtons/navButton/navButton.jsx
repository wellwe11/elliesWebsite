import classes from "./navButton.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

// a wrapper for each nav-button
const NavButton = ({ children, link }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link);
  };

  return (
    // on-click is applied to wrapper to isolate logic from buttonWithContent
    <div className={classes.button}>
      <ButtonWithContent onClick={handleNavigate} fontType={"h6"}>
        {children}
      </ButtonWithContent>
    </div>
  );
};

export default NavButton;
