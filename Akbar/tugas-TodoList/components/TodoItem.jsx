import React, { useContext } from "react";
import { TodoContext } from "../App";

const TodoItem = ({ todo }) => {
  const getTodoTitleStyle = () => {
    if (todo.completed === true) {
      return { textDecoration: "line-through" };
    } else {
      return { textDecoration: "none" };
    }
  };
  const { toggleCompleted, deleteTodo } = useContext(TodoContext);

  return (
    <div style={styles.todoItem}>
      <input
        type="checkbox"
        style={styles.checkbox}
        onChange={() => toggleCompleted(todo.id)}
      />
      <p style={getTodoTitleStyle()}>{todo.title}</p>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  todoItem: {
    border: "2px solid #f4f4f4",
    fontSize: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  checkbox: {
    marginRight: "10px",
    height: "18px",
    width: "18px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    margin: 10,
  },
  button: {
    backgroundColor: "#BB0000",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    padding: "10px 20px",
    fontWeight: "bold",
  },
};

export default TodoItem;
