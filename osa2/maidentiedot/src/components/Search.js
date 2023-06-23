import "./Search.css";

const Search = ({handleSearchChange}) => {
  return(
    <div className="search">
      <label>find countries:</label>
      <input type="text" onChange={handleSearchChange}/>
    </div>
  )
};

export default Search;