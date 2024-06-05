import React, { useState } from "react";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <div style={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add your Todo"
            style={styles.formInput}
            onChange={this.handleChangeTitle}
            value={this.state.title}
          />
          <button style={styles.button}>Add Todo</button>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    marginBottom: "32px",
  },
  formInput: {
    height: "66px",
    width: "40%",
    fontSize: "16px",
    padding: "0 16px",
  },
  button: {
    height: "72px",
    fontSize: "16px",
  },
};

export default TodoForm;
