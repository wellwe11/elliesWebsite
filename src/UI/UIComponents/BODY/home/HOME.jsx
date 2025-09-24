import classes from "./MAINPAGE.module.scss";

import MainPageTopPresentation from "./mainPageTopPresentation/mainPageTopPresentation.jsx";
import mainImage from "@assets/welcomeImage.jpg";
import welcomeImageOne from "@assets/welcomeImageOne.jpg";

import Categories from "./categories/categories.jsx";
import artCategory from "@assets/categories/artCategory.webp";
import bookmarksCategory from "@assets/categories/bookmarksCategory.webp";
import printsCategory from "@assets/categories/printsCategory.webp";
import stickersCategory from "@assets/categories/stickersCategory.webp";

import useFetchDataIDs from "@hooks/useFetchDataIDs.jsx";
import UseFetchData from "@hooks/useFetchData.jsx";

import Prints from "./prints/prints.jsx";
import Paintings from "./paintings/paintings.jsx";
import Services from "./services/services.jsx";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";
import NewIn from "./newIn/newIn.jsx";

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

const useHomeData = () => {
  // fetch all data needed on front-page
  const { data: printData, printLoading } = useFetchDataIDs(
    "/API_imitation/home/paintings.json"
  );

  const { data: paintData, paintLoading } = useFetchDataIDs(
    "/API_imitation/home/prints.json"
  );

  const { data: serviceData, loading: serviceLoading } = UseFetchData(
    "/API_imitation/home/services.json"
  );

  const isLoading = printLoading || paintLoading || serviceLoading;

  return { printData, paintData, serviceData, isLoading };
};

const Home = () => {
  const { printData, paintData, serviceData, isLoading } = useHomeData();

  if (isLoading) {
    return null;
  }

  // Welcoming image and small animation
  const topSection = (
    <section className={classes.topSection}>
      <MainPageTopPresentation
        images={smallCircleImages}
        mainImage={mainImage}
      />
    </section>
  );

  // Clickable images to navigate to filtered products
  const categoriesSection = (
    <section className={classes.categoriesSection}>
      <Categories categories={categories} />
    </section>
  );

  // wrapper that contains all top-level data for prints
  const printSection = (
    <section className={classes.printSection}>
      <Prints data={printData} />
    </section>
  );

  // Realistic image containing different colletions of images to "ikea-style" display them
  const servicesSection = (
    <section className={classes.serviceSection}>
      <Services data={serviceData} />
    </section>
  );

  // Example-images of paintings
  const paintingsSection = (
    <section className={classes.paintingSection}>
      <Paintings data={paintData} />
    </section>
  );

  const newInSection = (
    <section className={classes.newInSection}>
      <NewIn />
    </section>
  );

  //   // spinning wheel of images from ellies page
  const instagramSection = (
    <section>
      <h1>insta</h1>
    </section>
  );

  // seperates sections with some form of image (currently with a placeholder) and margins
  const sectionSeperatorWithImage = (
    <div className={classes.sectionSeperationWrapper}>
      <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
    </div>
  );

  // seperates sections simply with margins and it's own height
  const sectionSeperatorWithNoImage = (
    <div className={`${classes.sectionSeperationWrapper} ${classes.lowMargin}`}>
      <SectionSeperationImage />
    </div>
  );

  return (
    <div>
      {topSection}
      {sectionSeperatorWithNoImage}

      {categoriesSection}
      {sectionSeperatorWithNoImage}

      {printSection}
      {sectionSeperatorWithImage}

      {/* {newInSection}
        {sectionSeperatorWithImage} */}

      {servicesSection}
      {sectionSeperatorWithImage}

      {paintingsSection}
      {sectionSeperatorWithImage}
    </div>
  );
};

export default Home;
