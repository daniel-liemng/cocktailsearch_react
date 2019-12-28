import React, { useRef, useEffect } from "react";

const SearchForm = ({ setSearchTerm }) => {
  const searchValue = useRef("");
  // console.log(searchValue);

  // get focus when render
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const searchCocktail = () => {
    // console.log(searchValue.current.value);
    setSearchTerm(searchValue.current.value);
  };

  return (
    <section className="section">
      <h2 className="section-title">search cocktail</h2>
      <form className="form search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktails</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search ..."
            onChange={searchCocktail}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
