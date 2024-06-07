import PropTypes from 'prop-types';

const BookItem = ({
  book,
  handleToggleComplete,
  handleDeleteBook,
  handleEditClick,
  handleEditChange,
  handleEditSave,
  editingBookId,
  editingBookTitle,
}) => {
  return (
    <div className="item">
      {editingBookId === book.id ? (
        <input
          type="text"
          value={editingBookTitle}
          onChange={handleEditChange}
          className="input"
        />
      ) : (
        <span className={`title ${book.completed ? 'completed' : ''}`}>{book.title}</span>
      )}
      <div className="buttonContainer">
        <button onClick={() => handleToggleComplete(book.id)} className="completeButton">
          {book.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        {editingBookId === book.id ? (
          <button onClick={handleEditSave} className="saveButton">
            Save
          </button>
        ) : (
          <button onClick={() => handleEditClick(book.id, book.title)} className="editButton">
            Edit
          </button>
        )}
        <button onClick={() => handleDeleteBook(book.id)} className="deleteButton">
          Delete
        </button>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleDeleteBook: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleEditSave: PropTypes.func.isRequired,
  editingBookId: PropTypes.number,
  editingBookTitle: PropTypes.string,
};

export default BookItem;
