import { useNavigate } from "react-router-dom";
import classes from "./BUTTONWITHCONTENT.module.scss";

const ButtonWithContent = ({ children, link }) => {
  // consider wrapping <a> inside of a div for more control over styling

  const navigate = useNavigate();

  const handleNaviage = () => {
    console.log(link);
    navigate(link);
  };

  return (
    <button className={classes.buttonWithContent} onClick={handleNaviage}>
      <div className={classes.childrenWrapper}>{children}</div>
    </button>
  );
};

export default ButtonWithContent;
