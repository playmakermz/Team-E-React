import React, {useState, createContext} from 'react';
import Todos from './Todos';
import TodoForm from './TodoForm';

export const TodoContext = createContext();

function App() {
  const [todos, setTodos] = useState([
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
  ])

  //console.log(todos);

  const toggleCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      //kembaliin todo yang completed === true
      return todo;
    })
    //di-set deh sama todo yg datanya udah diperbarui
    setTodos(updatedTodos);
  }

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  const addTodo = (todoTitle) => {
    if (todoTitle === '') {
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    }

    const updatedTodos = todos.concat(newTodo);
    setTodos(updatedTodos);

  }

  return (
    <TodoContext.Provider value={{toggleCompleted, deleteTodo}}>
      <div style={listStyle.container}>
        <h1 style={listStyle.title}>My Todo List</h1>
        <TodoForm addTodo={addTodo}/>
        <Todos 
        todos={todos} 
        />
      </div>
    </TodoContext.Provider>
  );
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
