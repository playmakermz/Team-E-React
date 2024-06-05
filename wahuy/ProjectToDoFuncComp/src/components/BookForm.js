import { useState } from "react";

function BookForm({ addBook, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(title, author);
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Buku</h2>
      <input
        type="text"
        placeholder="Judul Buku"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Penulis Buku"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <div className="form-buttons">
        <input type="submit" value="Tambah" />
        <button type="button" onClick={onCancel} className="cancel-button">
          Batal
        </button>
      </div>
    </form>
  );
}

export default BookForm;
