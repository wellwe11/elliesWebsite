import classes from "./navLogo.module.scss";
import logoImage from "@assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavLogo = ({ setActiveButton, setHoverButton }) => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.logoContainer}
      onClick={() => {
        window.scrollTo({ top: 0 });
        setActiveButton(0);
        setHoverButton(0);
        navigate("./");
      }}
    >
      <img className={classes.navLogoImage} src={logoImage} alt="" />
      <h1 className={classes.logo}>
        art & <br />
        cards co.
      </h1>
    </div>
  );
};

export default NavLogo;
