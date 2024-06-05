import { useContext, useState } from "react";
import { BookContext } from "../App";

function Books({ books }) {
  const { deleteBook, updateBook } = useContext(BookContext);
  const [isEditing, setIsEditing] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const handleEdit = (book) => {
    setIsEditing(book.id);
    setNewTitle(book.title);
    setNewAuthor(book.author);
  };

  const handleUpdate = (bookId) => {
    if (!newTitle || !newAuthor) {
      alert("Judul dan penulis harus diisi.");
      return;
    }
    updateBook(bookId, newTitle, newAuthor);
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setNewTitle("");
    setNewAuthor("");
  };

  return (
    <ul className="book-list">
      {books.map((book, index) => (
        <li key={book.id} className="book-item">
          {isEditing === book.id ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Judul Buku"
                className="edit-input"
              />
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Penulis Buku"
                className="edit-input"
              />
              <div className="button-group">
                <button
                  onClick={() => handleUpdate(book.id)}
                  className="update-button"
                >
                  Update
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                {index + 1}. {book.title} - {book.author}
              </p>
              <div className="button-group">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Books;
