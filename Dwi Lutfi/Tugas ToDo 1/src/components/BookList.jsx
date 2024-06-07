
import PropTypes from 'prop-types';
import BookItem from './BookItem.jsx';

const BookList = ({
  books,
  handleToggleComplete,
  handleDeleteBook,
  handleEditClick,
  handleEditChange,
  handleEditSave,
  editingBookId,
  editingBookTitle,
}) => {
  return (
    <div className="itemContainer">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          handleToggleComplete={handleToggleComplete}
          handleDeleteBook={handleDeleteBook}
          handleEditClick={handleEditClick}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
          editingBookId={editingBookId}
          editingBookTitle={editingBookTitle}
        />
      ))}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleDeleteBook: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleEditSave: PropTypes.func.isRequired,
  editingBookId: PropTypes.number,
  editingBookTitle: PropTypes.string,
};

export default BookList;
