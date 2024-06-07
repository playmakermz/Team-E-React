import React, { useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const updateTodo = (index, newTodo) => {
    const newTodos = [...todos];
    newTodos[index] = newTodo;
    setTodos(newTodos);
    setCurrentTodo(null);
  };

  return (
    <div className="container">
      <h1 className="text-center">To-Do List</h1>
      <TodoForm
        addTodo={addTodo}
        updateTodo={updateTodo}
        currentTodo={currentTodo !== null ? todos[currentTodo] : ""}
        currentIndex={currentTodo}
      />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        setCurrentTodo={setCurrentTodo}
      />
    </div>
  );
};

export default TodoApp;
