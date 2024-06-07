import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  console.log(title);
  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(title);
    setTitle("");
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div style={styles.group}>
          <input
            type="text"
            placeholder="Add new Todo"
            style={styles.formInput}
            onChange={(event) => {
              handleChangeTitle(event);
            }}
            value={title}
          />
          <button style={styles.button}>Add Todo</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "32px",
  },
  group: {
    display: "flex",
    lineHeight: "28px",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  formInput: {
    height: "35px",
    width: "40%",
    fontSize: "16px",
    padding: "0 16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    backgroundColor: "blue",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    padding: "10px 20px",
    fontWeight: "bold",
    marginLeft: 10,
  },
};

export default TodoForm;
