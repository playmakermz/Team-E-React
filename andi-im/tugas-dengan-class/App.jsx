import Todos from "./components/Todos";
import TodoForm from "./components/TodoForm";
import React, { useState, createContext } from "react";
export const TodoContext = createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: "Finish Progate React Course",
          completed: false,
        },
        {
          id: 2,
          title: "Have lunch with Guru Domba",
          completed: false,
        },
        {
          id: 3,
          title: "Study React with Ninja Ken",
          completed: false,
        },
      ]
    };
  }

  deleteTodo = (todoId) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== todoId);
    this.setState({ todos: updatedTodos });
  };

  toggleCompleted = (todoId) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  addTodo = (todoTitle) => {
    if (todoTitle === "") {
      return;
    }

    const newTodo = {
      id: this.state.todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    const updatedTodos = [...this.state.todos, newTodo];
    this.setState({ todos: updatedTodos });
  };

  render() {
    return (
      <TodoContext.Provider value={{ toggleCompleted: this.toggleCompleted, deleteTodo: this.deleteTodo }}>
        <div style={styles.container}>
          <h1 style={styles.title}>My Todo List</h1>
          <TodoForm addTodo={this.addTodo} />
          <Todos todos={this.state.todos} />
        </div>
      </TodoContext.Provider>
    );
  }
}

const styles = {
  container: {
    textAlign: "center",
    padding: "12px",
  },
  title: {
    fontSize: "36px",
  },
};

export default App;
