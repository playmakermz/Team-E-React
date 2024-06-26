import React, {useState} from 'react';
import Todos from './components/Todos';
import TodoForm from './components/TodoForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: 'Mengerjakan tugas project ToDo-App',
          completed: false,
        },
        {
          id: 2,
          title: 'Mengerjakan tugas weather-app',
          completed: false,
        },
        {
          id: 3,
          title: 'Mengerjakan tugas akhir Movie-app',
          completed: false,
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
    const newTodos = this.state.todos.filter(todo => todo.id !== todoId);
    this.setState({ todos: newTodos });
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
      <div style={styles.container}>
        <h1 style={styles.title}>My Todo List</h1>
        <TodoForm addTodo={this.addTodo} />
        <Todos todos={this.state.todos} toggleCompleted={this.toggleCompleted} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '12px',
  },
  title: {
    fontSize: '36px',
  },
};

export default App;
