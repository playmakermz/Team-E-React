import React, { useState, useEffect } from "react";

const TodoForm = ({ addTodo, updateTodo, currentTodo, currentIndex }) => {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (currentTodo) {
      setTodo(currentTodo);
    } else {
      setTodo("");
    }
  }, [currentTodo]);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo.trim() === "") return;

    if (currentIndex !== null) {
      updateTodo(currentIndex, todo);
    } else {
      addTodo(todo);
    }

    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={todo}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        {currentIndex !== null ? "Update To-Do" : "Add To-Do"}
      </button>
    </form>
  );
};

export default TodoForm;
