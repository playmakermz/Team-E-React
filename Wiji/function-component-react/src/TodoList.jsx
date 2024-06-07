import React from "react";

const TodoList = ({ todos, deleteTodo, setCurrentTodo }) => {
  return (
    <ul className="list-group">
      {todos.map((todo, index) => (
        <li key={index} className="list-group-item">
          {todo}
          <button
            className="btn btn-secondary btn-sm float-right ml-2"
            onClick={() => setCurrentTodo(index)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm float-right"
            onClick={() => deleteTodo(index)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
