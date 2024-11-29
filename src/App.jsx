import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoke } from "./jokeSlice";

function App() {

  //Redux doesn't want useState and useEffect  
  const [category, setcategory] = useState()
  const joke = useSelector(function (state) {
    return state.joke.joke//state(parameter) inside jokes-reducer and inside jokes-variable data
  })

  //useDispatch will call actions
  const dispatch = useDispatch()

  function handleChange(e) {
    setcategory(e.target.value)
  }

  //when btn click api will be fetch
  function handleFetch() {
    dispatch(fetchJoke(category))//when fetchJoke call i also send category to jokeSlice.js
  }

  //If error 
  const isError = joke.startsWith("Error:");
  let errorMessage = "";
  let availableCategories = "";

  if (isError) {
    const [error, categories] = joke.split("|||");
    errorMessage = error.trim();
    availableCategories = categories?.trim() || "";
  }

  return (
    <section id="container" className="border border-white rounded-tl-3xl rounded-br-3xl shadow-lg shadow-slate-50">
      <h1 id="heading" className="text-white font-bold text-3xl pb-1 underline"><strong>Mini Jokes Hub</strong></h1>
      <div id="div_1">
        <input id="input_box" onChange={handleChange} type="text" placeholder="Enter category here" className="border border-none rounded-l-md p-1 outline-none"/>
        <button id="button" onClick={handleFetch} className="border border-none rounded-r-md bg-[#2563EB] p-1 hover:bg-[#225ad3] text-white">
          Get {category === ""  ?"Random"  :`from ${category}`}
        </button>
        </div>

        {/* Ternary operator used here */}
        <div id="div_2">
        {isError ? (
          <div className="flex flex-col items-center justify-center">
            <h1 id="head_2" className="text-red-500 text-xl">{errorMessage}</h1>
            <h1 id="head_2" className="text-white text-xl pb-2">{availableCategories}</h1>
          </div>
        ) : (
          <h1 id="head_2" className="text-white text-xl">{joke}</h1>
        )}
        </div>

    </section>
  );
};

export default App