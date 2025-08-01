import classes from "./scrollText.module.scss";

// bio-text, placed below image, which displays text related to current active image
// ! EXCEPTION TO RULES !.
// Mapped is allowed because it is directly related to it's styling.
// Styling cannot be directly applied unless more content is added
const TextThatCorrespondsToActiveImage = ({
  texts,
  activeImage,
  color = "black",
}) => {
  if (!texts) return;

  return texts.map((text, index) => (
    <span
      style={{
        top:
          activeImage > index
            ? `${(texts?.length / 2) * index + 30}px`
            : activeImage < index
            ? `${(texts?.length / 2) * index - 30}px`
            : "0px",
        opacity: activeImage === index ? "1" : "0",
        color: color,
      }}
      className={classes.fontTypeSpanBio}
      key={index}
    >
      {text}
    </span>
  ));
};

export default TextThatCorrespondsToActiveImage;
