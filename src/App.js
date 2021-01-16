import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';
import React,{useEffect,useState}  from "react";

const App=() =>{
  const APP_ID="YOUR APP ID";
  const APP_KEY="YOUR APP KEY";

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
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
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
