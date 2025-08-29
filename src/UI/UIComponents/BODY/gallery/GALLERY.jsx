import { useEffect, useMemo, useState } from "react";

import classes from "./GALLERY.module.scss";
import PageSelector from "./pageSelector/pageSelector";
import FilterSideBar from "./filterSideBar/filterSideBar";
import Products from "./products/products";
import { useLocation, useParams } from "react-router-dom";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

const Gallery = ({ data }) => {
  // all types (paintings, prints, accessories are 'flattened')
  // Works like a parent-variable. Always contains an array of all data, and never changes.
  const [flattedData, setFlattedData] = useState(null);

  // route
  const { category, id } = useParams(); // category: paintings, prints etc for link. Id for page-number. If id is active, means you're currently on a category.
  const { hash } = useLocation(); // page-number
  const navigate = handleNavigateSmooth();

  const pageNumber = +hash.replace(/\D/g, "") || 1; // remove hash or anything else that comes with the current page

  // state
  const [filter, setFilter] = useState(id ? category : null); // filter-boolean - when active, changes filteredData to matching objects
  const [page, setPage] = useState(pageNumber); // active page

  // initial useEffect - updates correct url on load
  useEffect(() => {
    if (filter && page) return; // if filter and page is active, do not set filter or page to anything new

    if (id) {
      setFilter(category); // if id (category & pagenumber)
    }
    setPage(pageNumber); // pagenumber based on hash
  }, []);

  // if filter or page updates
  useEffect(() => {
    if (!filter) {
      navigate(`/gallery/page#${+page}`); // if no filter, navigate to correct page
    }

    if (filter) {
      navigate(`/gallery/${filter}/page#${+page}`); // if filter, navigate to filter and then corresponding page
    }

    window.scrollTo({ top: 0 }); // always reset to top of window
  }, [filter, page, hash]);

  // Filters data based on current filter
  const filteredData = useMemo(() => {
    if (!flattedData) return; // only works if data has been platted
    if (!filter) return flattedData; // if no filter, return unfilted data

    return flattedData.filter((obj) => obj?._embedded.details.type === filter); // otherwise, filter data based on active filter
  }, [filter, flattedData]);

  // effect that flattens data out to allow items to be displayed in 'random' order with no filters
  // runs only once, when data initially is loaded (on page-laod)
  useEffect(() => {
    if (!data) return;

    const flatData = Object.values(data) // since fetched data-objects are all stored in varius arrays, we flatten them and sort them based on id
      .flat()
      .sort((a, b) => a.id - b.id);
    setFlattedData(flatData);
  }, [data]);

  if (!filteredData)
    return (
      <div>
        <h1>loading..</h1>
      </div>
    );

  const filterSideBarWrapper = (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar
        data={data}
        filter={filter}
        setFilter={setFilter}
        setPage={setPage}
      />
    </div>
  );

  const productsWrapper = (
    <div className={classes.productsWrapper}>
      <Products products={filteredData} page={page} />
    </div>
  );

  const pageWrapper = (
    <div className={classes.pageWrapper}>
      <PageSelector products={filteredData} page={page} setPage={setPage} />
    </div>
  );

  return (
    <div className={classes.gallery}>
      <div className={classes.galleryTop}>
        {filterSideBarWrapper}
        {productsWrapper}
      </div>
      {pageWrapper}
    </div>
  );
};

export default Gallery;
