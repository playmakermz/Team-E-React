import React from 'react';
import Todos from './Todos';
import TodoForm from './TodoForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: "Finish Progate React Course",
          completed: false
        },
        {
          id: 2,
          title: "Have lunch with Guru Domba",
          completed: false
        },
        {
          id: 3,
          title: "Study React with Ninja Ken",
          completed: false
        }
      ]
    };
  }

  toggleCompleted = (todoId) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  deleteTodo = (todoId) => {
    this.setState({ todos: this.state.todos.filter((todo) => todo.id !== todoId) });
  }

  addTodo = (todoTitle) => {
    if (todoTitle === '') {
      return;
    }

    const newTodo = {
      id: this.state.todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    const updatedTodos = this.state.todos.concat(newTodo);
    this.setState({ todos: updatedTodos });
  }

  render() {
    return (
      <div style={listStyle.container}>
        <h1 style={listStyle.title}>My Todo List</h1>
        <TodoForm addTodo={this.addTodo} />
        <Todos
          todos={this.state.todos}
          toggleCompleted={this.toggleCompleted}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

const listStyle = {
  container: {
    textAlign: 'center',
    padding: '40px',
  },
  title: {
    fontSize: '36px'
  }
}

export default App;
