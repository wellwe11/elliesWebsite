import classes from "./MAINPAGE.module.scss";

import MainPageTopPresentation from "./mainPageTopPresentation/mainPageTopPresentation";
import mainImage from "@assets/welcomeImage.jpg";
import welcomeImageOne from "@assets/welcomeImageOne.jpg";

import Categories from "./categories/categories";
import artCategory from "@assets/categories/artCategory.webp";
import bookmarksCategory from "@assets/categories/bookmarksCategory.webp";
import printsCategory from "@assets/categories/printsCategory.webp";
import stickersCategory from "@assets/categories/stickersCategory.webp";

import Prints from "./prints/prints";
import Paintings from "./paintings/paintings";
import Services from "./services/services";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

// Categories section
const categories = {
  Prints: {
    image: printsCategory,
  },
  Paintings: {
    image: artCategory,
  },

  Bookmarks: {
    image: bookmarksCategory,
  },
  Stickers: {
    image: stickersCategory,
  },
};

const smallCircleImages = [welcomeImageOne, welcomeImageOne, welcomeImageOne];

const MainPage = ({ topLayerData, serviceData }) => {
  // Welcoming image and small animation
  const topSection = (
    <section>
      <MainPageTopPresentation
        images={smallCircleImages}
        mainImage={mainImage}
      />
    </section>
  );

  // Clickable images to navigate to filtered products
  const categoriesSection = (
    <section>
      <Categories categories={categories} />
    </section>
  );

  // data for prints
  const topLayerDataPrints = topLayerData?.prints;
  // wrapper that contains all top-level data for prints
  const printSection = (
    <section>
      <Prints data={topLayerDataPrints} />
    </section>
  );

  // Realistic image containing different colletions of images to "ikea-style" display them
  const servicesSection = (
    <section>
      <Services data={serviceData} />
    </section>
  );

  // data for paintings
  const topLayerDataPaintings = topLayerData?.paintings;
  // Example-images of paintings
  const paintingsSection = (
    <section>
      <Paintings data={topLayerDataPaintings} />
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

  if (topLayerData) {
    return (
      <div>
        {topSection}
        {sectionSeperatorWithNoImage}

        {categoriesSection}
        {sectionSeperatorWithImage}

        {printSection}
        {sectionSeperatorWithImage}

        {servicesSection}
        {sectionSeperatorWithImage}

        {paintingsSection}
        {sectionSeperatorWithImage}
      </div>
    );
  }
};

export default MainPage;
