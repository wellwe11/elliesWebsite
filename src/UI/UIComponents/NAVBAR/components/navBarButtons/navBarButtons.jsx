import useGetLocation from "@hooks/useGetLocation.jsx";
import classes from "./navBarButtons.module.scss";
import NavButton from "./navButton/navButton.jsx";

import { capitalizeFirstLetter } from "../../../../../abstract/functions/firstLetterCapital.js";

const Buttons = ({
  buttons,
  activeButton,
  setActiveButton,
  setHoverButton,
}) => {
  const buttonKeys = Object.keys(buttons);

  return buttonKeys.map((key, index) => (
    <div
      key={key}
      onClick={() => {
        setActiveButton(index);
      }}
      onMouseEnter={() => setHoverButton(index)}
      onMouseLeave={() => setHoverButton(activeButton)}
      className={classes.buttonWrapper}
    >
      <NavButton link={Object.values(buttons)[index]}>
        {capitalizeFirstLetter(key)}
      </NavButton>
    </div>
  ));
};

const ButtonsUnderline = ({ hoverButton, buttons }) => {
  const { pathname } = useGetLocation();
  // thin line below buttons that displays currently hovered button
  const buttonUnderlinePosition = 100 * hoverButton, // calculate buttons position relevant to currently active button
    underlineWidth = 100 / Object.values(buttons).length, // calculate the buttons width depending on amount of buttons
    underlineOpacity = pathname.includes("uniqueImage") ? "0" : "1",
    underlineStyle = {
      opacity: underlineOpacity,
      transform: `translateX(${buttonUnderlinePosition}%)`,
      width: `${underlineWidth}%`,
    };

  return <span className={classes.buttonUnderline} style={underlineStyle} />;
};

// main-buttons
const NavbarButtons = ({
  buttons,
  setActiveButton,
  setHoverButton,
  hoverButton,
  activeButton,
}) => {
  return (
    <div className={classes.buttonsWrapper}>
      <Buttons
        buttons={buttons}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setHoverButton={setHoverButton}
      />
      <ButtonsUnderline hoverButton={hoverButton} buttons={buttons} />
    </div>
  );
};

export default NavbarButtons;
