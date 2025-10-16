import checkForValidFont from "@functions/checkForValidFont";
import classes from "./scrollText.module.scss";

// bio-text, placed below image, which displays text related to current active image

// ! EXCEPTION TO RULES !
// Mapped is allowed because it is directly related to it's styling.
// Styling cannot be directly applied unless more content is added
const ScrollText = ({
  texts,
  activeImage,
  color = "black",
  fontSize = "h6",
  fontWeight = 400,
}) => {
  if (!texts) return;

  const FontSize = checkForValidFont(fontSize);

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
      <FontSize style={{ fontVariationSettings: `'wght' ${fontWeight}` }}>
        {text}
      </FontSize>
    </span>
  ));
};

export default ScrollText;
