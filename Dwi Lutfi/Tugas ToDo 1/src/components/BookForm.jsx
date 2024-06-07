
import PropTypes from 'prop-types';

const BookForm = ({ newBookTitle, setNewBookTitle, handleAddBook, error }) => {
  return (
    <div>
      <div className="inputContainer">
        <input
          type="text"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
          placeholder="Enter book title"
          className="input"
        />
        <button onClick={handleAddBook} className="submitButton">
          Add Book
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

BookForm.propTypes = {
  newBookTitle: PropTypes.string.isRequired,
  setNewBookTitle: PropTypes.func.isRequired,
  handleAddBook: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default BookForm;
