import classes from "./scrollText.module.scss";

// bio-text, placed below image, which displays text related to current active image
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
