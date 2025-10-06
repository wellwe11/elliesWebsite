import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useSetActiveNavButton = (buttons) => {
  const { pathname } = useLocation();

  const [activeButton, setActiveButton] = useState(0),
    [hoverButton, setHoverButton] = useState(0),
    [loadTab, setLoadTab] = useState(false);

  const setActiveNavButton = () => {
    // find active tab
    // split names of tabs
    const buttonsKeys = Object.keys(buttons);

    // split current link
    const splittedPathName = pathname.split("/");

    // find if any buttonKeys exist inside of url
    buttonsKeys.forEach((btn, index) => {
      if (
        splittedPathName.includes(btn) ||
        (btn === "home" && splittedPathName.includes(""))
      ) {
        // if yes, change index to that
        setActiveButton(index);
        setHoverButton(index);
      }
    });

    setLoadTab(true);
  };

  useEffect(() => {
    setActiveNavButton();
  }, [pathname]);

  return {
    activeButton,
    setActiveButton,
    hoverButton,
    setHoverButton,
    loadTab,
  };
};

export default useSetActiveNavButton;
