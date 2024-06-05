import React, { useContext } from "react";
import { TodoContext } from "../App";

class TodoItem extends React.Component {
  static contextType = TodoContext;

  getTodoTitleStyle = () => {
    if (this.props.todo.completed === true) {
      return { textDecoration: "line-through" };
    } else {
      return { textDecoration: "none" };
    }
  };

  render() {
    const {toggleCompleted, deleteTodo} = this.context;
    return (
      <div style={styles.todoItem}>
        <input
          type="checkbox"
          style={styles.checkBox}
          onChange={() => toggleCompleted(this.props.todo.id)}
        />
        <p style={this.getTodoTitleStyle()}>{this.props.todo.title}</p>
        <button style={styles.button} onClick={() => deleteTodo(this.props.todo.id)}>
          x
        </button>
      </div>
    );
  }
}

const styles = {
  todoItem: {
    border: "2px solid #f4f4f4",
    fontSize: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  checkbox: {
    height: "18px",
    width: "18px",
  },
  button: {
    backgroundColor: "#BB0000",
    color: "#fff",
    height: "30px",
    width: "30px",
    borderRadius: "100%",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default TodoItem;
