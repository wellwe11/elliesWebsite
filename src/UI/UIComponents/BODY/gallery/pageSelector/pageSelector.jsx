import ArrowRoundEdgesSVG from "@components/SVGS/arrowRoundEdgesSVG/arrowRoundEdgesSVG";
import classes from "./pageSelector.module.scss";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
const RightButton = ({ page, maxPage, navigate }) => {
  const increment = () => {
    // if next page can contain products
    if (page < maxPage) {
      navigate({ hash: `${page + 1}` });
    }
  };

  return (
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
};

// change page backwards - decrement page
const LeftButton = ({ page, navigate }) => {
  const decrement = () => {
    // prevent page from going below 0
    if (page > 0) {
      navigate({ hash: `${page - 1}` });
    }
  };

  return (
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
};

const PageNumbers = ({ page, maxPage, navigate }) => {
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

  if (!pagesArr) return <h1>loading...</h1>;

  // array displaying pagesArr
  return (
    <div className={classes.currentPageWrapper}>
      {pagesArr.map((arrNr, index) => (
        <button
          key={index}
          className={classes.pageSelectorButton}
          style={{
            gridColumn: +index + 1,
          }}
          onClick={() => navigate({ hash: `${+arrNr}` })} // changes current page if you click a number (and not previous/next)
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
};

const BackToZeroButton = ({ page, navigate }) => {
  const backToZeroStyle = {
    display: page >= 3 ? "block" : "none",
  };

  return (
    <div className={classes.backToZeroButtonWrapper} style={backToZeroStyle}>
      <button
        onClick={() => navigate({ hash: `${1}` })}
        style={backToZeroStyle}
        className={classes.pageSelectorButton}
      >
        <p className={classes.btnText}>1...</p>
      </button>
    </div>
  );
};

// buttons that change pages, or rather, changes the index in which products can be displayed
const PageSelector = ({ products }) => {
  const navigate = useNavigate();
  const { hash } = useLocation();

  const pageNumber = +hash.replace(/\D/g, "") || 1; // remove hash or anything else that comes with the current page
  const maxPage = Math.ceil(products?.length / 9); // max-amount of pages that can be displayed - it is based on whether or not products exist on next page

  useEffect(() => {
    // resets page to top whenever you update page
    window.scrollTo({ top: 0 });
  }, [hash]);

  return (
    <div className={classes.pageSelector}>
      <LeftButton page={pageNumber} navigate={navigate} />
      <BackToZeroButton page={pageNumber} navigate={navigate} />
      <PageNumbers page={pageNumber} maxPage={maxPage} navigate={navigate} />
      <RightButton page={pageNumber} maxPage={maxPage} navigate={navigate} />
    </div>
  );
};

export default PageSelector;
