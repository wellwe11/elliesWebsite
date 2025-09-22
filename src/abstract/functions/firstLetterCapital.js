export const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string")
    return console.log(
      "argument needs to be typeof string in: firstLetterCapital function"
    );

  const firstLetterCapital = string.slice(0, 1).toUpperCase();
  const restOfString = string.slice(1);

  return firstLetterCapital + restOfString;
};

export const capitalizeAllFirstLetters = (string) => {
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};
