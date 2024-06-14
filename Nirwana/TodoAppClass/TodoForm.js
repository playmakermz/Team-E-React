import React from "react";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  }

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div style={listStyle.container}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add your Todo"
            style={listStyle.formInput}
            onChange={this.handleChangeTitle}
            value={this.state.title}
          />
          <button style={listStyle.button}>Add Todo</button>
        </form>
      </div>
    );
  }
}

const listStyle = {
  container: {
    marginBottom: '32px',
  },
  formInput: {
    height: '66px',
    width: '40%',
    fontSize: '16px',
    padding: '0 16px',
  },
  button: {
    height: '72px',
    fontSize: '16px',
  },
}

export default TodoForm;
