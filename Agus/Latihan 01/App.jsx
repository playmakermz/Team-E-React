import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      isLoading: false,
      isShowingTodos: false,
      hoverTodoId: null, // To track the hovered todo
    }
    this.handleShowClick = this.handleShowClick.bind(this)
    this.handleHideClick = this.handleHideClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMark = this.handleMark.bind(this)
    this.handleGithubLinkClick = this.handleGithubLinkClick.bind(this)
  }

  handleShowClick() {
    this.setState({ isLoading: true, isShowingTodos: true })

    setTimeout(() => {
      const todos = [
        { id: 1, name: "Membuat Header", completed: false },
        { id: 2, name: "Membuat Main", completed: false },
        { id: 3, name: "Membuat Array Map", completed: false },
        { id: 4, name: "Membuat Footer", completed: false },
      ]

      this.setState({ todos: todos, isLoading: false })
    }, 2000) // Simulasi loading
  }

  handleHideClick() {
    this.setState({ isShowingTodos: false })
  }

  handleMouseEnter(id) {
    this.setState({ hoverTodoId: id })
  }

  handleMouseLeave() {
    this.setState({ hoverTodoId: null })
  }

  handleMark(id) {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }))
  }

  handleGithubLinkClick() {
    window.open("https://github.com/MuhammadAgusLuthfi", "_blank")
  }

  render() {
    const { todos, isLoading, isShowingTodos, hoverTodoId } = this.state

    return (
      <div style={styles.app}>
        <Header title="Todo App" />
        <main>
          {isLoading && <p style={styles.loading}>Loading...</p>}
          {isShowingTodos &&
            !isLoading &&
            todos.map((todo) => (
              <div
                key={todo.id}
                style={
                  hoverTodoId === todo.id
                    ? { ...styles.todo, ...styles.todoHover }
                    : styles.todo
                }
                onMouseEnter={() => this.handleMouseEnter(todo.id)}
                onMouseLeave={this.handleMouseLeave}
              >
                <span style={todo.completed ? styles.completed : {}}>
                  {todo.name}
                </span>
                <button
                  style={styles.markButton}
                  onClick={() => this.handleMark(todo.id)}
                >
                  {todo.completed ? "Unmark" : "Mark"}
                </button>
              </div>
            ))}
        </main>
        <div>
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={this.handleShowClick}
          >
            Show Todos
          </button>
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={this.handleHideClick}
          >
            Hide Todos
          </button>
        </div>
        <Footer
          author={"Suga"}
          onGithubLinkClick={this.handleGithubLinkClick}
        />
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <div style={styles.header}>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div style={styles.footer}>
        <p>
          by{" "}
          <span
            style={styles.githubLink}
            onClick={this.props.onGithubLinkClick}
          >
            Suga
          </span>
        </p>
      </div>
    )
  }
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    backgroundColor: "#4caf50",
    padding: "20px",
    color: "white",
    borderRadius: "5px",
  },
  footer: {
    marginTop: "20px",
    fontSize: "0.8em",
    color: "#555",
  },
  todo: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    position: "relative",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  todoHover: {
    backgroundColor: "#e0f7fa",
    transform: "scale(1.02)",
  },
  completed: {
    textDecoration: "line-through",
    color: "gray",
  },
  loading: {
    fontSize: "20px",
    color: "#ff9800",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    marginTop: "20px",
    marginLeft: "10px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#2196f3",
    color: "white",
    borderRadius: "5px",
    transition: "background-color 0.3s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#1976d2",
  },
  markButton: {
    position: "absolute",
    top: "5px",
    right: "10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px",
    cursor: "pointer",
    borderRadius: "3px",
    transition: "background-color 0.3s, transform 0.2s",
  },
  markButtonHover: {
    backgroundColor: "#d32f2f",
    transform: "scale(1.1)",
  },
  githubLink: {
    color: "#2196f3",
    textDecoration: "underline",
    cursor: "pointer",
  },
}

export default App
