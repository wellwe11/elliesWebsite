import { useLocation } from "react-router-dom";
import classes from "./pageNotFound.module.scss";

const PageNotFound = () => {
  const location = useLocation();
  const path = location.pathname;
  const text = path.length > 20 ? path.slice(0, 20) + "..." : path.slice(0, 20);

  console.log(path);

  return (
    <div className={classes.pageNotFound}>
      <div className={classes.textWrapper}>
        <h1>{`ERROR 404 - Page: "${text}" doesnt exist :(`}</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
