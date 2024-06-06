import React, { useState, useEffect } from "react"

const Footer = () => (
  <div style={styles.footer}>
    <p>Created by Muhammad Agus Luthfi</p>
    <a
      href="https://github.com/MuhammadAgusLuthfi"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.link}
    >
      Visit my GitHub
    </a>
  </div>
)

const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("todoItems")
    return savedItems ? JSON.parse(savedItems) : ["JavaScript", "C++"]
  })
  const [newItem, setNewItem] = useState("")
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editedItemText, setEditedItemText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items))
  }, [items])

  const handleInputChange = (event) => {
    setNewItem(event.target.value)
  }

  const handleEditInputChange = (event) => {
    setEditedItemText(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem])
      setNewItem("")
    }
  }

  const updateItem = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? editedItemText : item
    )
    setItems(updatedItems)
    setEditingIndex(-1)
    setEditedItemText("")
  }

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const startEditing = (index) => {
    setEditingIndex(index)
    setEditedItemText(items[index])
  }

  const handleKeyPress = (event, index = null) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (index !== null) {
        updateItem(index)
      } else {
        addItem()
      }
    }
  }

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={styles.appContainer}>
      <div style={styles.todoContainer}>
        <h2 style={styles.heading}>Daftar Bahasa Pemrograman</h2>
        <div style={styles.inputContainer}>
          <textarea
            value={newItem}
            onChange={handleInputChange}
            placeholder="Tambahkan item baru"
            style={styles.textArea}
            onKeyPress={handleKeyPress}
          />
          <button onClick={addItem} style={styles.button}>
            Add
          </button>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Cari item"
          style={styles.searchInput}
        />
        <ul style={styles.listContainer}>
          {filteredItems.map((item, index) => (
            <li key={index} style={styles.listItem}>
              {editingIndex === index ? (
                <div>
                  <textarea
                    value={editedItemText}
                    onChange={handleEditInputChange}
                    style={styles.textArea}
                    placeholder="Edit item"
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                  <div style={styles.buttonContainer}>
                    <button
                      onClick={() => updateItem(index)}
                      style={styles.editButton}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(-1)}
                      style={styles.button}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {item}
                  <div style={styles.buttonContainer}>
                    <button
                      onClick={() => startEditing(index)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(index)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  todoContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    boxSizing: "border-box",
    marginBottom: "20px",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  textArea: {
    flexGrow: 1,
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    resize: "none",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "0px",
  },
  listItem: {
    listStyle: "none",
    marginBottom: "10px",
    backgroundColor: "#e8f5e9",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#ffc107",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "16px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "16px",
  },
  searchInput: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "20px",
    fontSize: "16px",
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
}

export default App
