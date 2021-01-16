import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';
import React,{useEffect,useState}  from "react";

const App=() =>{
  const APP_ID="f9792ca6";
  const APP_KEY="8b80357c21e8a3da0c8ced3ba3db7219";

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState('chicken')

  useEffect(()=>{
    getRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query]);

  const updateSearch=e=>{
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
  }

  const getRecipes=async()=>{
    // eslint-disable-next-line no-template-curly-in-string
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=f9792ca6&app_key=8b80357c21e8a3da0c8ced3ba3db7219`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="submit-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}
export default App;
