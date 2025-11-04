import classes from "./categories.module.scss";

const Text = ({ children }) => {
  const title = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.`;
  const bio = `onec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.`;

  return (
    <div className={classes.textContainer}>
      <h6 className={classes.textTitle}>{title}</h6>
      <p className={classes.textBio}>{bio}</p>
    </div>
  );
};

const LSpan = ({ index, l }) => {
  return (
    <span
      className={classes.l}
      style={{
        transform: `translateY(${index * 1.4}px)`,
        opacity: `calc(1 - 0.${index - 0.8})`,
      }}
    >
      {l}
    </span>
  );
};

const MappedLetters = ({ text }) =>
  text.split("").map((l, i) => <LSpan key={l + i} index={i} l={l} />);

const Button = ({ text = "Please insert text" }) => {
  return (
    <button className={classes.button}>
      <div className={classes.buttonBackgroundWrapper}>
        <div className={classes.buttonBackgroundFadeIn} />
        <div className={classes.buttonBackgroundFadeOut} />
      </div>
      <div className={classes.textOne}>
        <MappedLetters text={text} />
      </div>
      <div className={classes.textTwo}>
        <MappedLetters text={text} />
      </div>
    </button>
  );
};

const Categories = () => {
  return (
    <div className={classes.categories}>
      <div className={classes.contentWrapper}>
        <div className={classes.textWrapper}>
          <Text>Explore Art in it's different forms with me</Text>
        </div>
        <div className={classes.buttonWrapper}>
          <Button text="Discover" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
