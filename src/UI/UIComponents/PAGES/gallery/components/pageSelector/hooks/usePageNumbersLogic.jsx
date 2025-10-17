import { useMemo } from "react";

const usePageNumbersLogic = (page, maxPage) => {
  const pageNumber = +page; // pages are 0-indexed, but are shown as 1-indexed because page 1 fits better than page 0 as initial page

  const getPageWindow = (page, max) => {
    // creates a dynamic array which displays current set of pages (always pageNumber-1, pageNumber, pageNumber+1)
    // also allows a border to be displayed for the active page
    const start = Math.max(1, Math.min(page - 1, max - 2)), // ensures window doesn't overflow
      end = Math.min(max, start + 2);

    const arr = [];

    for (let i = start; i <= end; i++) arr.push(i);

    return arr;
  };

  const pagesArr = useMemo(
    () => getPageWindow(pageNumber, maxPage),
    [pageNumber, maxPage]
  ); // useMemos the 3 active buttons

  return { pagesArr, pageNumber };
};

export default usePageNumbersLogic;
