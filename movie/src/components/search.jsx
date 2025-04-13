import React from "react";

const Search = ({searchItem,setsearchItem})=>{
 return(
    <div className="search">
       <div>

        <img src="search.svg" alt="Search"/>
        <input 
        type="text"
        placeholder="Search your fav movie"
        value={searchItem}
        onChange={(event)=>setsearchItem(event.target.value)}
        />

       </div>
    </div>
 )
}

export default Search;