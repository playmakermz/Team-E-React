
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="inputContainer">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search books"
        className="input"
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
