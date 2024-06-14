import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(title);
    setTitle('');
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  return (
    <div style={listStyle.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add your Todo"
          style={listStyle.formInput}
          onChange={handleChangeTitle}
          value={title}
        />
        <button style={listStyle.button}>Add Todo</button>
      </form>
    </div>
  );
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
