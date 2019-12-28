import React, { useState, useEffect } from "react";

import SearchForm from "../components/SearchForm";
import CocktailsList from "../components/CocktailsList";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("m");
  const [cocktails, setCocktails] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
  //   )
  //     .then(res => res.json())
  //     .then(data => setCocktails(data.drinks));
  // }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    async function getDrinks() {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const data = await res.json();
        const { drinks } = data;
        if (drinks) {
          // create a new arr with needed and customized info
          const newCocktails = drinks.map(item => {
            const {
              idDrink,
              strDrink,
              strAlcoholic,
              strDrinkThumb,
              strGlass
            } = item;
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass
            };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getDrinks();
  }, [searchTerm]);

  return (
    <main>
      <SearchForm setSearchTerm={setSearchTerm} />
      <CocktailsList loading={loading} cocktails={cocktails} />
    </main>
  );
};

export default Home;
