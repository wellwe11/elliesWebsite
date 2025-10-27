import classes from "./categories.module.scss";

const Text = ({ children }) => {
  return (
    <div className={classes.textContainer}>
      <h4 className={classes.text}>{children}</h4>
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

const Button = () => {
  return (
    <button className={classes.button} style={{ animationDelay: `1.${1}s` }}>
      <div className={classes.buttonBackgroundWrapper}>
        <div className={classes.buttonBackgroundFadeIn} />
        <div className={classes.buttonBackgroundFadeOut} />
      </div>
      <div className={classes.textOne}>
        <MappedLetters text={"Explore"} />
      </div>
      <div className={classes.textTwo}>
        <MappedLetters text={"Explore"} />
      </div>
    </button>
  );
};

const Categories = () => {
  return (
    <div className={classes.categories}>
      <div className={classes.contentWrapper}>
        <Text>Explore Art in it's different forms with me</Text>
        <Button />
      </div>
    </div>
  );
};

export default Categories;
