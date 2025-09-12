import ArrowRoundEdgesSVG from "@components/SVGS/arrowRoundEdgesSVG/arrowRoundEdgesSVG";
import classes from "./pageSelector.module.scss";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
const RightButton = ({ page, maxPage, navigate, category }) => {
  const url = category
    ? `/gallery?category=${category}&page=${page + 1}`
    : `/gallery?page=${page + 1}`;
  const increment = () => {
    // if next page can contain products
    if (page < maxPage) {
      navigate(url);
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
const LeftButton = ({ page, navigate, category }) => {
  const url = category
    ? `/gallery?category=${category}&page=${page - 1}`
    : `/gallery?page=${page - 1}`;
  const decrement = () => {
    // prevent page from going below 0
    if (page > 0) {
      // scrollTop();
      navigate(url);
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

const PageNumbers = ({ page, maxPage, navigate, category }) => {
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

  if (!pagesArr) return;

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
          onClick={() =>
            navigate(`/gallery?category=${category}&page=${arrNr}`)
          } // changes current page if you click a number (and not previous/next)
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

const BackToZeroButton = ({ page, navigate, category }) => {
  const backToZeroStyle = {
    display: page >= 4 ? "block" : "none",
  };

  return (
    <div className={classes.backToZeroButtonWrapper} style={backToZeroStyle}>
      <button
        onClick={() => navigate(`/gallery?category=${category}&page=${1}`)}
        style={backToZeroStyle}
        className={classes.pageSelectorButton}
      >
        <p className={classes.btnText}>1...</p>
      </button>
    </div>
  );
};

// buttons that change pages, or rather, changes the index in which products can be displayed
const PageSelector = ({ maxPage }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;
  const category = searchParams.get("category") || "";

  return (
    <div className={classes.pageSelector}>
      <LeftButton page={page} navigate={navigate} category={category} />
      <BackToZeroButton page={page} navigate={navigate} category={category} />
      <PageNumbers
        page={page}
        maxPage={maxPage}
        navigate={navigate}
        category={category}
      />
      <RightButton
        page={page}
        maxPage={maxPage}
        navigate={navigate}
        category={category}
      />
    </div>
  );
};

export default PageSelector;
