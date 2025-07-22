import classes from "./scrollText.module.scss";

// bio-text, placed below image, which displays text related to current active image
const TextThatCorrespondsToActiveImage = ({ texts, activeImage }) => {
  if (!texts) return;
  return texts.map((text, index) => (
    <span
      style={{
        top:
          activeImage > index
            ? `${2 * index + 30}px`
            : activeImage < index
            ? `${2 * index - 30}px`
            : "0px",
        opacity: activeImage === index ? "1" : "0",
      }}
      className={classes.fontTypeSpanBio}
      key={index}
    >
      {text}
    </span>
  ));
};

export default TextThatCorrespondsToActiveImage;
