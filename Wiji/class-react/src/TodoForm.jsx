import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.currentTodo || '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentTodo !== this.props.currentTodo) {
      this.setState({ todo: this.props.currentTodo });
    }
  }

  handleChange = (event) => {
    this.setState({ todo: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.todo.trim() === '') return;

    if (this.props.currentIndex !== null) {
      this.props.updateTodo(this.props.currentIndex, this.state.todo);
    } else {
      this.props.addTodo(this.state.todo);
    }

    this.setState({ todo: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={this.state.todo}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {this.props.currentIndex !== null ? 'Update To-Do' : 'Add To-Do'}
        </button>
      </form>
    );
  }
}

export default TodoForm;
