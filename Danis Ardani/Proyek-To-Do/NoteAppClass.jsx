import React, { Component } from "react";

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: "#f7f7f7",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "20px 0",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  footer: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "20px 0",
    textAlign: "center",
    position: "sticky",
    bottom: 0,
    zIndex: 100,
    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
  },
  noteApp: {
    textAlign: "center",
    flex: 1,
  },
  noteContainer: {
    margin: "20px auto",
    padding: "20px",
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  noteContainerH2: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    margin: "10px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  noteInput: {
    width: "80%",
    padding: "10px 12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  noteList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  noteItem: {
    width: "80%",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  noteText: {
    flex: 1,
    textAlign: "left",
    marginLeft: "10px",
    wordWrap: "break-word",
    width: "inherit",
    fontSize: "16px",
    color: "#333",
    padding: "10px 12px",
  },
  noteChecked: {
    textDecoration: "line-through",
    color: "#999",
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
  },
  deleteButton: {
    marginLeft: "10px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "white",
    transition: "background-color 0.3s",
  },
  deleteButtonHover: {
    backgroundColor: "#b30000",
  },
  editButton: {
    marginLeft: "10px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "white",
    transition: "background-color 0.3s",
  },
  editButtonHover: {
    backgroundColor: "#006400",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
  },
  searchInput: {
    width: "60%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};


class Header extends React.Component {
  render() {
    return (
      <header style={styles.header}>
        <h1>Note App</h1>
      </header>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer style={styles.footer}>
        <p>© 2024 Note App</p>
      </footer>
    );
  }
}

class NoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      isEditing: false,
      editedNote: this.props.note.content,
    };
  }

  handleCheckboxChange = () => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
  };

  handleEditChange = (e) => {
    this.setState({ editedNote: e.target.value });
  };

  handleEditToggle = () => {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  };

  handleSave = () => {
    this.props.onUpdate(this.props.note.id, this.state.editedNote);
    this.handleEditToggle();
  };

  render() {
    const noteStyle = this.state.checked
      ? { ...styles.noteText, ...styles.noteChecked }
      : styles.noteText;

    return (
      <div style={styles.noteItem}>
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleCheckboxChange}
        />
        {this.state.isEditing ? (
          <input
            type="text"
            value={this.state.editedNote}
            onChange={this.handleEditChange}
            style={styles.noteInput}
          />
        ) : (
          <div style={noteStyle}>{this.props.note.content}</div>
        )}
        {this.state.isEditing ? (
          <button
            style={styles.editButton}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.editButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.editButton.backgroundColor)
            }
            onClick={this.handleSave}
          >
            Save
          </button>
        ) : (
          <button
            style={styles.editButton}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.editButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.editButton.backgroundColor)
            }
            onClick={this.handleEditToggle}
          >
            Edit
          </button>
        )}
        <button
          style={styles.deleteButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.deleteButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.deleteButton.backgroundColor)
          }
          onClick={() => this.props.onDelete(this.props.note.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default class NoteApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: "",
      searchQuery: "",
      errorMessage: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ currentNote: e.target.value });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  addNote = () => {
    if (this.state.currentNote.trim() !== "") {
      this.setState((prevState) => ({
        notes: [
          ...prevState.notes,
          { id: crypto.randomUUID(), content: prevState.currentNote },
        ],
        currentNote: "",
        errorMessage: "",
      }));
    } else {
      this.setState({ errorMessage: "Note cannot be empty" });
    }
  };

  clearNotes = () => {
    this.setState({ notes: [] });
  };

  deleteNote = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  };

  updateNote = (id, updatedContent) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, content: updatedContent } : note
      ),
    }));
  };

  clearSearch = () => {
    this.setState({ searchQuery: "" });
  };

  render() {
    const filteredNotes = this.state.notes.filter((note) =>
      note.content.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    const hasSearchResults = filteredNotes.length > 0;

    return (
      <div style={styles.appContainer}>
        <Header />
        <div style={styles.noteApp}>
          <div style={styles.noteContainer}>
            <h2 style={styles.noteContainerH2}>Notes</h2>
            <div>
              <input
                type="text"
                value={this.state.currentNote}
                onChange={this.handleInputChange}
                style={styles.noteInput}
                placeholder="Enter your note here..."
              />
              {this.state.errorMessage && (
                <p style={styles.errorMessage}>{this.state.errorMessage}</p>
              )}
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.buttonHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.button.backgroundColor)
                }
                onClick={this.addNote}
              >
                Add Note
              </button>
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.buttonHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.button.backgroundColor)
                }
                onClick={this.clearNotes}
              >
                Clear Notes
              </button>
            </div>
            <div style={styles.searchContainer}>
  <input
    type="text"
    value={this.state.searchQuery}
    onChange={this.handleSearchChange}
    style={styles.searchInput}
    placeholder="Search notes..."
  />
  <button
    style={styles.button}
    onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)
    }
    onClick={this.clearSearch}
  >
    Clear Search
  </button>
</div>
            {hasSearchResults ? (
              <div style={styles.noteList}>
                {filteredNotes.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onDelete={this.deleteNote}
                    onUpdate={this.updateNote}
                  />
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "#999" }}>
                No notes found.
              </p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
