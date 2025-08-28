import classes from "./pageSelector.module.scss";
import { useEffect, useMemo } from "react";

const NavButton = ({ onClick, disabled, label }) => (
  <button
    className={classes.pageSelectorButton}
    onClick={onClick}
    disabled={disabled}
  >
    <p className={classes.buttonText}>{label}</p>
  </button>
);

// change page forward - increment page
const RightButton = ({ setPage, page, maxPage }) => {
  const increment = () => {
    // if next page can contain products
    if (page < maxPage) {
      setPage((prev) => prev + 1);
    }
  };

  const rightButton = (
    <NavButton onClick={increment} disabled={page === maxPage} label={"Next"} />
  );

  return rightButton;
};

// change page backwards - decrement page
const LeftButton = ({ page, setPage }) => {
  const decrement = () => {
    // prevent page from going below 0
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const leftButton = (
    <NavButton onClick={decrement} disabled={page === 1} label={"Previous"} />
  );

  return leftButton;
};

const PageNumbers = ({ page, setPage, maxPage }) => {
  const pageNumber = +page; // pages are 0-indexed, but are shown as 1-indexed because page 1 fits better than page 0 as initial page

  // creates a dynamic array which displays current set of pages (always pageNumber-1, pageNumber, pageNumber+1)
  // also allows a div-underline to display the active page
  const getPageWindow = (page, max) => {
    const start = Math.max(1, Math.min(page - 1, max - 2)); // ensures window doesn't overflow
    const end = Math.min(max, start + 2);

    const arr = [];

    for (let i = start; i <= end; i++) arr.push(i);

    return arr;
  };

  const pagesArr = useMemo(
    () => getPageWindow(pageNumber, maxPage),
    [pageNumber, maxPage]
  );

  const currentPageNumber = (
    <div className={classes.currentPageWrapper}>
      {pagesArr.map((arrNr, index) => (
        <button
          key={index}
          className={classes.pageSelectorButton}
          style={{ gridColumn: +index + 1 }}
          onClick={() => setPage(+arrNr - 1)}
        >
          <p className={classes.btnText}>{+arrNr}</p>

          {
            // makes it so that underline is correctly displaying current page
            pageNumber === arrNr && <div className={classes.underline} />
          }
        </button>
      ))}
    </div>
  );

  return currentPageNumber;
};

const BackToZeroButton = ({ setPage }) => (
  <NavButton onClick={() => setPage(1)} label={1} />
);

// buttons that change pages, or rather, changes the index in which products can be displayed
const PageSelector = ({ page, setPage, products }) => {
  const maxPage = Math.ceil(products?.length / 9) - 1; // max-amount of pages that can be displayed - it is based on whether or not products exist on next page

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  return (
    <div className={classes.pageSelector}>
      <BackToZeroButton setPage={setPage} />
      <LeftButton page={page} setPage={setPage} />
      <PageNumbers page={page} setPage={setPage} maxPage={maxPage} />
      <RightButton setPage={setPage} page={page} maxPage={maxPage} />
    </div>
  );
};

export default PageSelector;
