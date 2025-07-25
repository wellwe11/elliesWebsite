import { useNavigate } from "react-router-dom";
import classes from "./BUTTONWITHCONTENT.module.scss";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

const ButtonWithContent = ({ children, link }) => {
  const navigate = handleNavigateSmooth();
  return (
    <button
      className={classes.buttonWithContent}
      onClick={() => navigate(link)}
    >
      <div className={classes.childrenWrapper}>
        <p>{children}</p>
      </div>
    </button>
  );
};

export default ButtonWithContent;
