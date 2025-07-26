import ControlledImage from "@components/controlledImage/controlledImage";
import classes from "./accessories.module.scss";

const AccessoriesTitle = ({ title }) => {
  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWrapper}>
        <h2 className={classes.title}>{title}</h2>
      </div>
    </div>
  );
};

const AccessoriesContainer = ({ categories }) => {
  const categoryKeys = Object.keys(categories);

  return (
    <div className={classes.accessoriesContainer}>
      {categoryKeys.map((category, index) => (
        <div className={classes.accessoriesWrapper} key={index}>
          <div className={classes.imageWrapper}>
            <ControlledImage
              imageSrc={Object.values(categories[category])}
              imageAlt=""
            />
          </div>
          <AccessoriesTitle title={category} />
        </div>
      ))}
    </div>
  );
};

const Accessories = ({ categories }) => {
  return (
    <section className={classes.accessories}>
      <div className={classes.accessoriesTitleWrapper}>
        <h1 className={classes.title}>Explore categories</h1>
      </div>
      <AccessoriesContainer categories={categories} />
    </section>
  );
};

export default Accessories;
