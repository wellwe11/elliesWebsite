import { useEffect, useState } from "react";
import useGetLocation from "@hooks/useGetLocation.jsx";

const setActiveNavButton = (
  buttons,
  pathname,
  setActiveButton,
  setHoverButton,
  setLoadTab
) => {
  // find active tab
  // split names of tabs
  const buttonsKeys = Object.keys(buttons);

  // split current link
  const splittedPathName = pathname.split("/");

  // find if any buttonKeys exist inside of url
  buttonsKeys.forEach((btn, index) => {
    if (splittedPathName.includes(btn)) {
      // if yes, change index to that
      setActiveButton(index);
      setHoverButton(index);
    }
  });

  setLoadTab(true);
};

const useSetActiveNavButton = (buttons) => {
  const { pathname } = useGetLocation();

  const [activeButton, setActiveButton] = useState(0),
    [hoverButton, setHoverButton] = useState(0),
    [loadTab, setLoadTab] = useState(false);

  useEffect(() => {
    setActiveNavButton(
      buttons,
      pathname === "/" ? "home" : pathname,
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
