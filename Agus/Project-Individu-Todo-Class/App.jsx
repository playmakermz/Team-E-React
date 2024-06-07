import React, { Component } from "react"

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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: ["JavaScript", "Python", "C"],
      newItem: "",
      editingIndex: -1,
      editedItemText: "",
      searchTerm: "",
    }
  }

  handleInputChange = (event) => {
    this.setState({ newItem: event.target.value })
  }

  handleEditInputChange = (event) => {
    this.setState({ editedItemText: event.target.value })
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  addItem = () => {
    const { items, newItem } = this.state
    if (newItem.trim()) {
      this.setState({
        items: [...items, newItem],
        newItem: "",
      })
    }
  }

  updateItem = (index) => {
    const { items, editedItemText } = this.state
    const updatedItems = items.map((item, i) =>
      i === index ? editedItemText : item
    )
    this.setState({
      items: updatedItems,
      editingIndex: -1,
      editedItemText: "",
    })
  }

  deleteItem = (index) => {
    const { items } = this.state
    this.setState({
      items: items.filter((_, i) => i !== index),
    })
  }

  startEditing = (index) => {
    const { items } = this.state
    this.setState({
      editingIndex: index,
      editedItemText: items[index],
    })
  }

  handleKeyPress = (event, index = null) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (index !== null) {
        this.updateItem(index)
      } else {
        this.addItem()
      }
    }
  }

  render() {
    const { items, newItem, editingIndex, editedItemText, searchTerm } =
      this.state

    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div style={styles.appContainer}>
        <div style={styles.shoppingListContainer}>
          <h2 style={styles.heading}>Daftar Bahasa Pemrograman</h2>
          <div style={styles.inputContainer}>
            <textarea
              value={newItem}
              onChange={this.handleInputChange}
              placeholder="Tambahkan item baru"
              style={styles.textArea}
              onKeyPress={this.handleKeyPress}
            />
            <button onClick={this.addItem} style={styles.button}>
              Tambah
            </button>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleSearchChange}
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
                      onChange={this.handleEditInputChange}
                      style={styles.textArea}
                      placeholder="Edit item"
                      onKeyPress={(e) => this.handleKeyPress(e, index)}
                    />
                    <div style={styles.buttonContainer}>
                      <button
                        onClick={() => this.updateItem(index)}
                        style={styles.editButton}
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => this.setState({ editingIndex: -1 })}
                        style={styles.button}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {item}
                    <div style={styles.buttonContainer}>
                      <button
                        onClick={() => this.startEditing(index)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.deleteItem(index)}
                        style={styles.deleteButton}
                      >
                        Hapus
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
  shoppingListContainer: {
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
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "16px",
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
