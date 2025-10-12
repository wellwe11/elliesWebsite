import { useEffect, useTransition } from "react";
import classes from "./navButton.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

import { useDataZustand } from "../../../../routeContainer/routeContainer.jsx";

// a wrapper for each nav-button

const NavButton = ({ children, link }) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { fetch, isLoading } = useDataZustand();

  const handleNavigate = async () => {
    const dataTab = children.toLowerCase();
    const path = `/API_imitation/${dataTab}/page.json`;

    const dataFetched = await fetch(path);

    if (dataFetched) {
      startTransition(() => {
        window.scrollTo({ top: 0 });
        navigate(link);
      });
    }
  };

  // Aide:
  // Tomorrow (12th oct.) My idea is as follows:
  // Install Zustand and create a global context for fetching data, and what page is active
  // Inside of Zustand > Fetch will have a custom hook: isLoading; default = true.
  // Fetch isLoading = true > fetch data > if (data) > setData > isLoading false;

  // For MainPageRoutes:
  // Use useTransition - ignore isPending and use isLoading instead and use it for switching the pages instead

  // const { isPending, isLoading } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () => fetchDataAndAssignID(path),
  // });

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
