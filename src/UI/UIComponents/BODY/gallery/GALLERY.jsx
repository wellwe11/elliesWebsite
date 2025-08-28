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

  const { category, id } = useParams();
  const { hash, pathname } = useLocation();

  const navigate = handleNavigateSmooth();

  // filter-boolean - when active, changes filteredData to matching objects
  const [filter, setFilter] = useState(null);

  // active page
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageNumber = +hash.replace(/\D/g, "") || 1;

    if (id) {
      setFilter(category);
    }
    setPage(pageNumber);
  }, []);

  useEffect(() => {
    if (!filter) {
      navigate(`/gallery/page#${+page}`);
    }

    if (filter) {
      navigate(`/gallery/${filter}/page#${+page}`);
    }
  }, [filter, page, hash]);

  // Filtered data based on current filter
  const filteredData = useMemo(() => {
    if (!filter) return flattedData;

    return flattedData.filter((obj) => obj?._embedded.details.type === filter);
  }, [filter, flattedData]);

  // effect that flattens data out to allow items to be displayed in 'random' order with no filters
  // runs only once, when data initially is loaded (on page-laod)
  useEffect(() => {
    if (!data) return;

    // since objects are all stored in varius arrays, we flatten them and sort them based on id
    const flatData = Object.values(data)
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
        page={page}
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
