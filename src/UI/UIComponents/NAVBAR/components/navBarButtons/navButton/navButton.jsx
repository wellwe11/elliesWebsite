import classes from "./navButton.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";

// a wrapper for each nav-button
const NavButton = ({ children, link, setFetchedData }) => {
  const navigate = useNavigate();

  const handleNavigate = async () => {
    const dataTab = children.toLowerCase();
    const path = `/API_imitation/${dataTab}/page.json`;
    const fetchedData = await fetchDataAndAssignID(path);

    if (fetchedData) {
      setFetchedData(fetchedData);
      window.scrollTo({ top: 0 });
      navigate(link);
    }
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
