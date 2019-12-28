import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const SingleCocktail = () => {
  const { id } = useParams();

  // useState
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  // useEffect
  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        console.log(data);
        const { drinks } = data;
        if (drinks) {
          // Alias
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          } = drinks[0];
          // create an array of ingredients
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          ];
          // create new obj of cocktail
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients
          };
          // update info of cocktail
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);

  // check if loading
  if (loading) {
    return <h2 className="section-title">loading ...</h2>;
  }

  // check if cocktail exist
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    // cocktail display
    const {
      name,
      image,
      info,
      category,
      glass,
      instructions,
      ingredients
    } = cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>name: {name}</p>
            <p>category: {category}</p>
            <p>info: {info}</p>
            <p>glass: {glass}</p>
            <p>instructions: {instructions}</p>
            <p>
              ingredients:
              {ingredients.map((item, index) => {
                return item && <li key={index}>{item}</li>;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;
