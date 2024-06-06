import React, { useState } from 'react';

const ShoppingList = () => {
  const [items, setItems] = useState(['Apel', 'Susu', 'Susu Bendera', 'Beras']);
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedItemText, setEditedItemText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const updateItem = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    setEditingIndex(-1);
  };

  const deleteItem = () => {
    const updatedItems = items.filter((_, i) => i !== itemToDelete);
    setItems(updatedItems);
    setShowModal(false);
    setItemToDelete(null);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedItemText(items[index]);
  };

  const confirmDelete = (index) => {
    setItemToDelete(index);
    setShowModal(true);
  };

  const handleKeyPress = (event, index = null) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (index !== null) {
        updateItem(index, editedItemText);
      } else {
        addItem();
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='shopping-list-container'>
      <h2>Daftar Belanja</h2>

      <div className='input-container'>
        <textarea
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder='Tambahkan item baru'
          onKeyPress={handleKeyPress}
        />
        <button onClick={addItem}>Tambah</button>
      </div>

      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Cari item'
      />

      <ul className='list-container'>
        {filteredItems.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <textarea
                  value={editedItemText}
                  onChange={(e) => setEditedItemText(e.target.value)}
                  className='text-edit'
                  placeholder='Edit item'
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
                <div className='text-edit-button'>
                  <button onClick={() => updateItem(index, editedItemText)}>
                    Simpan
                  </button>
                  <button onClick={() => setEditingIndex(-1)}>Batal</button>
                </div>
              </div>
            ) : (
              <>
                {item}
                <div className='button-container'>
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => confirmDelete(index)}>Hapus</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal'>
            <p>Apakah Anda yakin ingin menghapus item ini?</p>
            <div className='modal-button-right'>
              <button onClick={deleteItem}>Ya</button>
              <button onClick={() => setShowModal(false)}>Tidak</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        body {
          background-color: #21222c;
          color: #f8f8f2;
          font-family: sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }

        .button-container {
          display: flex;
          align-items: center;
          justify-content: right;
          gap: 10px;
        }

        .modal-button-right {
          display: flex;
          align-items: center;
          justify-content: right;
          gap: 10px;
        }

        .text-edit {
          margin-right: 0.5rem;
        }

        .text-edit-button {
          display: flex;
          align-items: center;
          justify-content: right;
          gap: 10px;
        }

        .shopping-list-container {
          background-color: #282a36;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          box-sizing: border-box;
          max-width: 500px;
        }

        .shopping-list-container h2 {
          margin-bottom: 15px;
          text-align: center;
        }

        .input-container {
          display: flex;
          gap: 10px;
        }

        .input-container textarea {
          flex-grow: 1;
          padding: 8px;
          border: none;
          background-color: #282a36;
          color: #f8f8f2;
          border-radius: 4px;
        }

        .list-container {
          display: flex;
          flex-direction: column;
          padding-left: 0px;
        }

        .list-container li {
          list-style: none;
          margin-bottom: 10px;
          background-color: #44475a;
          padding: 10px;
          border-radius: 4px;
          word-break: break-all;
        }

        .list-container li > div {
          display: flex;
          align-items: center;
          flex-grow: 1;
        }

        .list-container li p {
          margin: 0;
          margin-right: 10px;
        }

        .shopping-list-container button {
          background-color: #bd93f9;
          color: #f8f8f2;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
        }

        .shopping-list-container button:hover {
          background-color: #ff79c6;
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #282a36;
          padding: 20px;
          border-radius: 8px;
          z-index: 10;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9;
        }
      `}</style>
    </div>
  );
};

export default ShoppingList;
