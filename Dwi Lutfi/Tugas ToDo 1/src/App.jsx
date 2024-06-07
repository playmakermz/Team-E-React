import { useState } from 'react';
import './App.css';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import SearchBar from './components/SearchBar.jsx';

const App = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'Laskar Pelangi', completed: false },
    { id: 2, title: 'Cantik Itu Luka', completed: false },
    { id: 3, title: 'Habis Gelap Terbitlah Terang', completed: false },
  ]);

  const [newBookTitle, setNewBookTitle] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBookId, setEditingBookId] = useState(null);
  const [editingBookTitle, setEditingBookTitle] = useState('');

  const handleAddBook = () => {
    if (!newBookTitle.trim()) {
      setError('Book title cannot be empty');
      return;
    }

    const newBook = {
      id: books.length ? books[books.length - 1].id + 1 : 1,
      title: newBookTitle,
      completed: false,
    };

    setBooks([...books, newBook]);
    setNewBookTitle('');
    setError('');
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleToggleComplete = (id) => {
    const updatedBooks = books.map(book =>
      book.id === id ? { ...book, completed: !book.completed } : book
    );
    setBooks(updatedBooks);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditClick = (id, title) => {
    setEditingBookId(id);
    setEditingBookTitle(title);
  };

  const handleEditChange = (event) => {
    setEditingBookTitle(event.target.value);
  };

  const handleEditSave = () => {
    if (!editingBookTitle.trim()) {
      setError('Book title cannot be empty');
      return;
    }

    const updatedBooks = books.map(book =>
      book.id === editingBookId ? { ...book, title: editingBookTitle } : book
    );

    setBooks(updatedBooks);
    setEditingBookId(null);
    setEditingBookTitle('');
    setError('');
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="content">
        <h1 className="title">Library ToDo List</h1>
        <BookForm 
          newBookTitle={newBookTitle}
          setNewBookTitle={setNewBookTitle}
          handleAddBook={handleAddBook}
          error={error}
        />
        <SearchBar 
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <BookList 
          books={filteredBooks}
          handleToggleComplete={handleToggleComplete}
          handleDeleteBook={handleDeleteBook}
          handleEditClick={handleEditClick}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
          editingBookId={editingBookId}
          editingBookTitle={editingBookTitle}
        />
      </div>
    </div>
  );
};

export default App;
