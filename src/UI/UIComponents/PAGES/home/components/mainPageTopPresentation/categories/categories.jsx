import classes from "./categories.module.scss";

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

const Categories = () => {
  const categories = ["Gallery", "Inspiration", "Contact"];

  return (
    <div className={classes.categories}>
      {categories.map((category, index) => (
        <div key={category} className={classes.textWrapper}>
          <button
            className={classes.button}
            style={{ animationDelay: `1.${index + 1}s` }}
          >
            <div className={classes.buttonBackgroundWrapper}>
              <div className={classes.buttonBackgroundFadeIn} />
              <div className={classes.buttonBackgroundFadeOut} />
            </div>
            <div className={classes.textOne}>
              <MappedLetters text={category} />
            </div>
            <div className={classes.textTwo}>
              <MappedLetters text={category} />
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
