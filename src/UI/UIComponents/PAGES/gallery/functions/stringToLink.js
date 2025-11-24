const stringToLink = (arr, type) => {
  if (!arr)
    return console.log("StringToLink requires an array as first argument");
  if (!type)
    return console.log("stringToLink requires a type as second argument");
  if (typeof type !== "string")
    return console.log("argument two; type, requires to be a string");

  if (arr.length < 1) return ""; // if there is no category

  return arr.map((c, index) => `${index > 0 ? "&" : ""}${type}=${c}`).join("");
};

export default stringToLink;
