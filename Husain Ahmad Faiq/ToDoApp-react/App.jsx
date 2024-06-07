import React, { useState } from 'react'
import Todos from './components/Todos'
import TodoForm from './components/TodoForm'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish Progate React Course',
      completed: false,
    },
    {
      id: 2,
      title: 'Have lunch with Guru Domba',
      completed: false,
    },
    {
      id: 3,
      title: 'Study React with Ninja Ken',
      completed: false,
    },
  ])

  const toggleCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos)
  }

  const addTodo = (title) => {
    const newTodo = {
      id: todos.length + 1,
      title: title,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const updateTodo = (todoId, newTitle) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.title = newTitle;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Todo List</h1>
      <TodoForm addTodo={addTodo} /> 
      <Todos
        todos={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '12px',
  },
  title: {
    fontSize: '36px',
  },
}

export default App
