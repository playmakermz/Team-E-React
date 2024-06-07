import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.todos.map((todo, index) => (
          <li key={index} className="list-group-item">
            {todo}
            <button
              className="btn btn-secondary btn-sm float-right ml-2"
              onClick={() => this.props.setCurrentTodo(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm float-right"
              onClick={() => this.props.deleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoList;
