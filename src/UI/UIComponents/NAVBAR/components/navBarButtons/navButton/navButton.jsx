import classes from "./navButton.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

const NavButton = ({ children, link }) => {
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate(link);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={classes.button}>
      <ButtonWithContent onClick={handleNavigate} fontType={"h6"}>
        {children}
      </ButtonWithContent>
    </div>
  );
};

export default NavButton;
