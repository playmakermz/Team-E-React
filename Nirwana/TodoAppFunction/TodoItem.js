import React, { useState, useContext } from 'react';
import { TodoContext } from './App';

const TodoItem = ({ todo }) => {
  const { toggleCompleted, deleteTodo, updateTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const getTodoTitleStyle = () => {
    return { textDecoration: todo.completed ? 'line-through' : 'none' };
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo(todo.id, editedTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  const handleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  return (
    <div style={listStyle.todoItem}>
      <input
        type="checkbox"
        style={listStyle.checkbox}
        checked={todo.completed}
        onChange={() => toggleCompleted(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleChange}
          style={listStyle.input}
        />
      ) : (
        <p style={{ ...getTodoTitleStyle(), ...listStyle.todoTitle }}>
          {todo.title}
        </p>
      )}
      {isEditing ? (
        <>
          <button style={listStyle.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button style={listStyle.saveButton} onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <button style={listStyle.editButton} onClick={handleEdit}>
            Edit
          </button>
          <button style={listStyle.deleteButton} onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

const listStyle = {
  todoItem: {
    border: '2px solid #f4f4f4',
    fontSize: '24px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px 20px',
    marginBottom: '10px',
  },
  checkbox: {
    height: '18px',
    width: '18px',
    marginRight: '20px', // Add right margin for even spacing
  },
  todoTitle: {
    flex: 1,
    margin: '0 20px', // Add left and right margin for even spacing
  },
  input: {
    flex: 1,
    fontSize: '24px',
    padding: '5px',
    margin: '0 20px', // Add left and right margin for even spacing
  },
  editButton: {
    backgroundColor: '#ddd',
    color: '#000',
    height: '30px',
    width: '60px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  },
  deleteButton: {
    backgroundColor: '#BB0000',
    color: '#fff',
    height: '30px',
    width: '60px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    height: '30px',
    width: '60px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cancelButton: {
    backgroundColor: '#bbb',
    color: '#000',
    height: '30px',
    width: '60px',
    borderRadius: '5px',
    border: '1px solid #bbb',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px', // Add right margin for spacing between buttons
  },
};

export default TodoItem;
