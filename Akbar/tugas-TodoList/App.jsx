import "./App.css";
import Todos from "./components/Todos";
import TodoForm from "./components/TodoForm";

import React, { useState, createContext } from "react";

export const TodoContext = createContext();

function App() {
  const addTodo = (todoTitle) => {
    if (todoTitle === "") {
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    const updatedTodos = todos.concat(newTodo);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish Project NAS DIY",
      completed: false,
    },
    {
      id: 2,
      title: "Istirahat dan Makan Siang",
      completed: false,
    },
    {
      id: 3,
      title: "Finish Course ReactJS Progate",
      completed: false,
    },
  ]);

  console.log(todos);

  return (
    <TodoContext.Provider value={{ toggleCompleted, deleteTodo }}>
      <div style={styles.container}>
        <h1 style={styles.title}>Todo List Akbar</h1>
        <TodoForm addTodo={addTodo} />
        <Todos todos={todos} />
      </div>
    </TodoContext.Provider>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    border: "2px solid grey",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#e8e8e8",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
  },
};

export default App;
