import { useState, createContext } from "react";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import "./App.css";

export const BookContext = createContext();

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Dilan: Dia Adalah Dilanku Tahun 1990",
      author: "Pidi Baiq",
    },
    {
      id: 2,
      title: "Dilan Bagian Kedua: Dia Adalah Dilanku Tahun 1991",
      author: "Pidi Baiq",
    },
    {
      id: 3,
      title: "Milea: Suara Dari Dilan",
      author: "Pidi Baiq",
    },
    {
      id: 4,
      title: "Ancika: Dia yang Bersamaku Tahun 1995",
      author: "Pidi Baiq",
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const deleteBook = (bookId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus buku ini?"
    );
    if (confirmDelete) {
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    }
  };

  const addBook = (bookTitle, bookAuthor) => {
    if (!bookTitle || !bookAuthor) {
      alert("Judul dan penulis harus diisi.");
      return;
    }

    if (books.some((book) => book.title === bookTitle)) {
      alert("Buku sudah ada.");
      return;
    }

    const newBook = {
      id: books.length + 1,
      title: bookTitle,
      author: bookAuthor,
    };

    setBooks([...books, newBook]);
    alert("Buku berhasil ditambahkan.");
    setIsFormVisible(false);
  };

  const updateBook = (bookId, newTitle, newAuthor) => {
    if (!newTitle || !newAuthor) {
      alert("Judul dan penulis harus diisi.");
      return;
    }

    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return { ...book, title: newTitle, author: newAuthor };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <BookContext.Provider value={{ deleteBook, updateBook }}>
      <div className="container">
        <h1 className="title">Daftar Buku Perpustakaan</h1>
        {!isFormVisible && (
          <button
            className="toggle-form-button"
            onClick={() => setIsFormVisible(true)}
          >
            Tambah Buku
          </button>
        )}
        {isFormVisible && (
          <BookForm
            addBook={addBook}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
        <Books books={books} />
      </div>
    </BookContext.Provider>
  );
}

export default App;
