import "./styles/search_bar.scss";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="searchbar-inputwrapper">
    <span className="material-symbols-rounded">search</span>
      <input
        className="searchbar"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
