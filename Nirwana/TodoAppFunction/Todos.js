import React from 'react';
import TodoItem from './TodoItem';

const Todos = ({ todos }) => {
  return (
    <div style={listStyle.container}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
}

const listStyle = {
  container: {
    width: '40%',
    margin: '0 auto'
  }
}

export default Todos;
