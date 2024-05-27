

const Search = ({ setLocaleID }) => {
  return (
    <div className="inputSearch">
      <label htmlFor="id">Id</label>
      <input className="input"
        type="number"
        id="id"
        defaultValue={1}
        onChange={(e) => {
          setLocaleID(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
