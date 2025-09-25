// used for rendering products based on the current page
const handleDisplayedProducts = (page, data) => {
  // page starts on 0, goes to 1, 2, 3 etc.
  const start = (+page - 1) * 9, // index of first object to display
    // So, 0, 8, 18 etc.
    end = start + 9; // index of last object to display
  // so, 8, 17, 26 etc.

  return data?.slice(start, end); // slices only visible objects for each page
};

export default handleDisplayedProducts;
