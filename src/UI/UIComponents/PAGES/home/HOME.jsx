import classes from "./HOME.module.scss";

import MainPageTopPresentation from "./components/mainPageTopPresentation/mainPageTopPresentation.jsx";
import mainImage from "@assets/welcomeImage.jpg";
import welcomeImageOne from "@assets/welcomeImageOne.jpg";

import Categories from "./components/categories/categories.jsx";
import artCategory from "@assets/categories/artCategory.webp";
import bookmarksCategory from "@assets/categories/bookmarksCategory.webp";
import printsCategory from "@assets/categories/printsCategory.webp";
import stickersCategory from "@assets/categories/stickersCategory.webp";

import Prints from "./components/prints/prints.jsx";
import Paintings from "./components/paintings/paintings.jsx";
import Services from "./components/services/services.jsx";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";
import NewIn from "./components/newIn/newIn.jsx";

import Loading from "../../LOADING/loading.jsx";
import Products from "./componentsPhoneSize/products/products.jsx";
import { useEffect, useState } from "react";

// Categories section
const categories = {
  prints: {
    image: printsCategory,
  },
  paintings: {
    image: artCategory,
  },

  bookmarks: {
    image: bookmarksCategory,
  },
  stickers: {
    image: stickersCategory,
  },
};

const smallCircleImages = [welcomeImageOne, welcomeImageOne, welcomeImageOne];

const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState(() => window.innerWidth);

  const windowResize = () => {
    setWindowSize((prev) => {
      const currentSize = window.innerWidth;

      if (Math.abs(currentSize - prev > 100)) {
        return currentSize;
      }
      return prev;
    });
  };

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => window.removeEventListener("resize", windowResize);
  }, []);

  return { windowSize };
};

const SectionSeperator = ({ lowMargin = false, withImage = false }) => (
  <div
    className={`${classes.sectionSeperationWrapper} ${
      lowMargin ? classes.lowMargin : ""
    }`}
  >
    <SectionSeperationImage withImage={withImage} />
  </div>
);

const Home = ({ data: { paintingsData, printsData, servicesData } }) => {
  const { windowSize } = useScreenSize();

  const MOBILESIZE = 425;

  return windowSize > MOBILESIZE ? (
    <div className={classes.home}>
      {/* DESKTOP */}
      <section className={classes.topSection}>
        <MainPageTopPresentation
          images={smallCircleImages}
          mainImage={mainImage}
        />
      </section>

      <SectionSeperator lowMargin />

      <section className={classes.categoriesSection}>
        <Categories categories={categories} />
      </section>
      <SectionSeperator lowMargin />

      <section className={classes.printSection}>
        <Prints data={printsData} />
      </section>

      {/* {newInSection}
        {sectionSeperatorWithImage} */}

      <div className={classes.servicesWrapper}>
        <SectionSeperator withImage />
        <section className={classes.serviceSection}>
          <Services data={servicesData} />
        </section>
        <SectionSeperator withImage />
      </div>

      <section className={classes.paintingSection}>
        <Paintings data={paintingsData} />
      </section>
      <SectionSeperator withImage />

      {/* <section className={classes.newInSection}>
      <NewIn />
    </section> */}

      {/* <section>
      <h1>insta</h1>
    </section> */}
    </div>
  ) : (
    <div className={classes.home}>
      {/* MOBILE */}

      <Products />
    </div>
  );
};

export default Home;
