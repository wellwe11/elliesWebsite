import { useTransition } from "react";
import classes from "./navButton.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";
import { useDataZustand } from "../../../../routeContainer/routeContainer.jsx";

const NavButton = ({ children, link }) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const { fetchData, isLoading } = useDataZustand();

  const handleNavigate = async () => {
    const path = children.toLowerCase();
    const pathLink = `/API_imitation/${path}/page.json`;

    fetchData(pathLink);

    startTransition(() => {
      navigate(link);
      window.scrollTo({ top: 0 });
    });
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
