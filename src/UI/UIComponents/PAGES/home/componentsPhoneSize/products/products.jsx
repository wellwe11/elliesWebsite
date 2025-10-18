import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";

const Products = ({ data }) => {
  const dataEntries = Object.entries(data);
  const regex = /data/i;

  const fixedTitles = dataEntries.map(([entry, obj]) => {
    const fixedTitle = capitalizeFirstLetter(entry.replace(regex, ""));

    return [fixedTitle, obj];
  });

  return (
    <div>
      {fixedTitles.map(([entry, obj], index) => (
        <div key={index}>
          <div>
            <h3>{entry}</h3>
          </div>

          <div>
            {obj.map((obj, index) => {
              const name = obj._embedded.setTitle;
              const image = obj.image;
              return (
                <div key={index}>
                  <h5>{name}</h5>
                  <img src={image} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
