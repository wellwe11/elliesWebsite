import ArrowRoundEdgesSVG from "@components/SVGS/arrowRoundEdgesSVG/arrowRoundEdgesSVG";
import classes from "./pageSelector.module.scss";
import { useEffect, useMemo } from "react";

// abstract button component which has the same structure & classes for all nav-buttons
const NavButton = ({ onClick, disabled, label }) => {
  const isString = typeof label === "string";
  return (
    <button
      className={classes.pageSelectorButton}
      onClick={onClick}
      disabled={disabled}
    >
      {isString ? <p className={classes.buttonText}>{label}</p> : label}
    </button>
  );
};

// change page forward - increment page
const RightButton = ({ setPage, page, maxPage }) => {
  const increment = () => {
    // if next page can contain products
    if (page < maxPage) {
      setPage((prev) => prev + 1);
    }
  };

  const rightButton = (
    <NavButton
      onClick={increment}
      disabled={page === maxPage}
      label={
        <div className={classes.rightButtonWrapper}>
          <ArrowRoundEdgesSVG />
        </div>
      }
    />
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
    <NavButton
      onClick={decrement}
      disabled={page === 1}
      label={
        <div className={classes.leftButtonWrapper}>
          <ArrowRoundEdgesSVG />
        </div>
      }
    />
  );

  return leftButton;
};

const PageNumbers = ({ page, setPage, maxPage }) => {
  const pageNumber = +page; // pages are 0-indexed, but are shown as 1-indexed because page 1 fits better than page 0 as initial page

  // creates a dynamic array which displays current set of pages (always pageNumber-1, pageNumber, pageNumber+1)
  // also allows a border to be displayed for the active page
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
  ); // useMemos the 3 active buttons

  // style for when the current page is displayed
  const activePageUnderline = {
    borderBottom: "1px solid var(--c-text-black)",
  };

  // array displaying pagesArr
  const currentPageNumber = (
    <div className={classes.currentPageWrapper}>
      {pagesArr.map((arrNr, index) => (
        <button
          key={index}
          className={classes.pageSelectorButton}
          style={{
            gridColumn: +index + 1,
          }}
          onClick={() => setPage(+arrNr)} // changes current page if you click a number (and not previous/next)
        >
          <p
            className={classes.btnText}
            style={pageNumber === arrNr ? activePageUnderline : {}}
          >
            {+arrNr}
          </p>
        </button>
      ))}
    </div>
  );

  return currentPageNumber;
};

const BackToZeroButton = ({ setPage, page }) => {
  const backToZeroStyle = {
    display: page > 2 ? "block" : "none",
    paddingLeft: page > 2 ? "10px" : "0px",
  };

  return (
    <div className={classes.backToZeroButtonWrapper} style={backToZeroStyle}>
      <button
        onClick={() => setPage(1)}
        style={backToZeroStyle}
        className={classes.pageSelectorButton}
      >
        <p className={classes.btnText}>1...</p>
      </button>
    </div>
  );
};

// buttons that change pages, or rather, changes the index in which products can be displayed
const PageSelector = ({ page, setPage, products }) => {
  const maxPage = Math.ceil(products?.length / 9); // max-amount of pages that can be displayed - it is based on whether or not products exist on next page

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  return (
    <div className={classes.pageSelector}>
      <LeftButton page={page} setPage={setPage} />
      <BackToZeroButton setPage={setPage} page={page} />
      <PageNumbers page={page} setPage={setPage} maxPage={maxPage} />
      <RightButton setPage={setPage} page={page} maxPage={maxPage} />
    </div>
  );
};

export default PageSelector;
