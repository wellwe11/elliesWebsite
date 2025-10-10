import classes from "./navBarButtons.module.scss";
import NavButton from "./navButton/navButton.jsx";

// main-buttons
const NavbarButtons = ({
  buttons,
  setActiveButton,
  setHoverButton,
  hoverButton,
  activeButton,
  setFetchedData,
}) => {
  const buttonKeys = Object.keys(buttons);

  // make all navbar buttons texts start with a capital letter
  const buttonNamesAllCaps = Object.keys(buttons).map(
    (key) => key.slice(0, 1).toUpperCase() + key.slice(1)
  );

  // navbar buttons
  const mappedNavButtons = buttonKeys.map((_, index) => (
    <div
      key={index}
      onClick={() => {
        setActiveButton(index);
      }}
      onMouseEnter={() => setHoverButton(index)}
      onMouseLeave={() => setHoverButton(activeButton)}
      className={classes.buttonWrapper}
    >
      <NavButton
        link={Object.values(buttons)[index]}
        setFetchedData={setFetchedData}
      >
        {buttonNamesAllCaps[index]}
      </NavButton>
    </div>
  ));

  // thin line below buttons that displays currently hovered button
  const buttonUnderlinePosition = 100 * hoverButton; // calculate buttons position relevant to currently active button
  const underlineWidth = 100 / Object.values(buttons).length; // calculate the buttons width depending on amount of buttons
  const buttonUnderline = (
    <span
      className={classes.buttonUnderline}
      style={{
        transform: `translateX(${buttonUnderlinePosition}%)`,
        width: `${underlineWidth}%`,
      }}
    />
  );

  return (
    <div className={classes.buttonsWrapper}>
      {mappedNavButtons}
      {buttonUnderline}
    </div>
  );
};

export default NavbarButtons;
