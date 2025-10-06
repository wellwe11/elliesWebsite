import classes from "./navLogo.module.scss";
import logoImage from "@assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavLogo = ({ setActiveButton, setHoverButton }) => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.logoContainer}
      onClick={() => {
        setActiveButton(0);
        setHoverButton(0);
        navigate("./");
      }}
    >
      <img className={classes.navLogoImage} src={logoImage} alt="" />
      <h3 className={classes.logo}>art & cards co.</h3>
    </div>
  );
};

export default NavLogo;
