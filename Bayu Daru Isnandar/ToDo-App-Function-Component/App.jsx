import React, {useState} from 'react';
import Todos from './components/Todos';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Mengerjakan tugas prroject ToDo-App',
      completed:false,
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
  ])

  console.log(todos)

  const toggleCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (todoId) => {
    const newTodos = todos.filter(todo => todo.id !== todoId)
    setTodos(newTodos)
  }

  const addTodo = (todoTitle) => {
    if (todoTitle === '') {
      return
    }

    const newTodo = {
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    }

    const updatedTodos = todos.concat(newTodo)
    setTodos(updatedTodos)
  }

  return (
    <div style={styles.container} > 
      <h1 style={styles.title}>My Todo List</h1>
      {/*
      {todos.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>
      })}
      */}
      <TodoForm addTodo={addTodo}/>
      <Todos todos={todos} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo}/>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '12px',
  },
  title: {
    fontSize: '36px'
  },

}

export default App;