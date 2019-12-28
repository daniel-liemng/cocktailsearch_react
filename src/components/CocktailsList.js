import React from "react";

import Cocktails from "./Cocktails";

const CocktailsList = ({ cocktails, loading }) => {
  // const { cocktails } = props;
  console.log(cocktails);
  // check if loading -> show Loading...
  if (loading) {
    return <h2 className="section-title">loading ...</h2>;
  }
  // check if no cocktails - empty array -> show No Cocktails
  if (cocktails.length < 1) {
    return (
      <h2 className="section-title">
        no cocktails matched your search criteria
      </h2>
    );
  }
  // return Cocktails
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map(item => {
          return <Cocktails key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default CocktailsList;
