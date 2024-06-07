import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentTodo: null,
    };
  }

  addTodo = (todo) => {
    this.setState({
      todos: [...this.state.todos, todo],
    });
  };

  deleteTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  };

  setCurrentTodo = (index) => {
    this.setState({ currentTodo: index });
  };

  updateTodo = (index, newTodo) => {
    const newTodos = [...this.state.todos];
    newTodos[index] = newTodo;
    this.setState({ todos: newTodos, currentTodo: null });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">To-Do List</h1>
        <TodoForm
          addTodo={this.addTodo}
          updateTodo={this.updateTodo}
          currentTodo={this.state.currentTodo !== null ? this.state.todos[this.state.currentTodo] : ''}
          currentIndex={this.state.currentTodo}
        />
        <TodoList
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          setCurrentTodo={this.setCurrentTodo}
        />
      </div>
    );
  }
}

export default TodoApp;
