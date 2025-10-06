import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import setActiveNavButton from "../functions/setActiveNavButton.js";

const useSetActiveNavButton = (buttons) => {
  const { pathname } = useLocation();

  const [activeButton, setActiveButton] = useState(0),
    [hoverButton, setHoverButton] = useState(0),
    [loadTab, setLoadTab] = useState(false);

  useEffect(() => {
    setActiveNavButton(
      buttons,
      pathname,
      setActiveButton,
      setHoverButton,
      setLoadTab
    );
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
