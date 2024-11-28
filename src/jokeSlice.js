import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

//this function can fetch api jokes
//createAsyncThunk("here it take link",here async function)
const fetchJoke = createAsyncThunk("jokes/jokecategory", async function (category, thunkAPI) {
    try {//available categories api from chucknorris.io website
        const responseCategories = await axios.get(`https://api.chucknorris.io/jokes/categories`)//action .payload have a category data
        const categories = responseCategories.data

        //this return returns upper return and that upper return returns fetchJoke

        //category exists
        if (!categories.includes(category)) {
            return (
                `Error: "No jokes for category "${category}" found."|||Available categories: ${categories.join(", ")}`
            );
        }

        // Fetch joke for the valid category
        const jokeResponse = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
        return jokeResponse.data.value;
    } catch (error) {//Uncategory data
        return thunkAPI.rejectWithValue("Error fetching data. Please try again.");
    }
}
);


const initialState = {
    joke: "No joke"//jokes->variable
}

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {//actions have category data 
        },//it also use extraReducers can handle actions,and extraReducers is for work with createAsyncThunk 
    extraReducers: (jokebuild) => {
        jokebuild.addCase(fetchJoke.pending, (state) => {
            state.joke = "Loading..."
            console.log("Loading...")
        }).addCase(fetchJoke.fulfilled, (state, action) => {//action .payload have a category data
            state.joke = action.payload//result.data.value is return action and in this action have payload it has jokes data
        }).addCase(fetchJoke.rejected, (state, action) => {
            state.joke = action.payload || "Something went wrong.";
        });
    }
})

export default jokeSlice
export { fetchJoke }