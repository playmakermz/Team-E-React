import React, { Component } from "react"

class App extends Component {
  state = {
    todos: ["Belajar Form", "Handle Error"],
    newTodo: "",
    error: "",
    isPopupVisible: false,
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value })
  }

  handleAddTodo = (e) => {
    e.preventDefault()
    const { newTodo, todos } = this.state

    if (!newTodo.trim()) {
      this.setState({
        error: "Todo tidak bisa kosong ngab wkwk",
        isPopupVisible: true,
      })
    } else if (todos.length >= 3) {
      this.setState({
        error: "Tiga todo saja, \njangan banyak-banyak wkwk",
        isPopupVisible: true,
      })
    } else {
      this.setState((state) => ({
        todos: [...state.todos, state.newTodo],
        newTodo: "",
        error: "",
      }))
    }
  }

  handleClosePopup = () => {
    this.setState({ isPopupVisible: false })
  }

  handleDeleteTodo = (index) => {
    this.setState((state) => {
      const todos = state.todos.slice()
      todos.splice(index, 1)
      return { todos, error: "" }
    })
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={styles.app}>
          <h1 style={styles.title}>Todo List</h1>
          <p style={styles.subtitle}>
            by{" "}
            <a
              href="https://github.com/MuhammadAgusLuthfi"
              style={styles.githubLink}
            >
              Suga
            </a>
          </p>
          <form onSubmit={this.handleAddTodo} style={styles.inputContainer}>
            <input
              type="text"
              value={this.state.newTodo}
              onChange={this.handleInputChange}
              placeholder="Add a new todo"
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Add
            </button>
          </form>
          <ul style={styles.todoList}>
            {this.state.todos.map((todo, index) => (
              <li
                key={index}
                style={
                  index === this.state.todos.length - 1
                    ? { ...styles.todoItem, ...styles.lastTodoItem }
                    : styles.todoItem
                }
              >
                <span>{todo}</span>
                <button
                  style={styles.deleteButton}
                  onClick={() => this.handleDeleteTodo(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {this.state.isPopupVisible && (
            <div style={styles.popup}>
              <p style={styles.popupText}>{this.state.error}</p>
              <button
                onClick={this.handleClosePopup}
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    color: "#333",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  app: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
    position: "relative",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0px",
    color: "#333",
  },
  subtitle: {
    fontSize: "16px",
    marginTop: "5px",
    marginBottom: "20px",
    color: "#888",
  },
  githubLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  todoList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
    transition: "background-color 0.3s",
  },
  lastTodoItem: {
    borderBottom: "none",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    padding: "5px",
    transition: "background-color 0.3s",
  },
  popup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: "999",
  },
  popupText: {
    marginBottom: "10px",
  },
  closeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px",
  },
}

export default App
