import ArrowRoundEdgesSVG from "@components/SVGS/arrowRoundEdgesSVG/arrowRoundEdgesSVG";
import classes from "./pageSelector.module.scss";

import { useNavigate } from "react-router-dom";
import usePageNumbersLogic from "./hooks/usePageNumbersLogic.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

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
  const activePageUnderline = {
    // style for when the current page is displayed
    borderBottom: "1px solid var(--c-text-black)",
  };

  const { pagesArr, pageNumber } = usePageNumbersLogic(page, maxPage); // retrieve relevant page/pages

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

const BackToZeroButton = ({ page, maxPage, navigate, category }) => {
  const backToZeroStyle = {
    display: page >= 3 && maxPage > 3 ? "block" : "none",
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

  const { page, category } = useGetParams();

  return (
    <div className={classes.pageSelector}>
      <LeftButton page={page} navigate={navigate} category={category} />
      <BackToZeroButton
        page={page}
        maxPage={maxPage}
        navigate={navigate}
        category={category}
      />
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
