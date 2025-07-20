import { useNavigate } from "react-router-dom";
import classes from "./BUTTONWITHCONTENT.module.scss";

const ButtonWithContent = ({ children, link }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(link);
      });
    } else {
      navigate(link);
    }
  };

  return (
    <button className={classes.buttonWithContent} onClick={handleNavigate}>
      <div className={classes.childrenWrapper}>
        <p>{children}</p>
      </div>
    </button>
  );
};

export default ButtonWithContent;
