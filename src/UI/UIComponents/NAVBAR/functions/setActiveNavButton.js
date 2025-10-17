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
  console.log(splittedPathName);

  // find if any buttonKeys exist inside of url
  buttonsKeys.forEach((btn, index) => {
    if (
      splittedPathName.includes(btn) ||
      (btn === "home" &&
        splittedPathName.includes("") &&
        !pathname.includes("uniqueImage"))
    ) {
      // if yes, change index to that
      setActiveButton(index);
      setHoverButton(index);
    }
  });

  setLoadTab(true);
};

export default setActiveNavButton;
