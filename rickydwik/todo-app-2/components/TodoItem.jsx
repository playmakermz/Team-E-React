import React, { useState } from 'react'

const TodoItem = ({ todo, toggleCompleted, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)

  const getTodoTitleStyle = () => {
    if (todo.completed) {
      return { textDecoration: 'line-through' }
    } else {
      return { textDecoration: 'none' }
    }
  }

  const handleUpdate = () => {
    updateTodo(todo.id, newTitle)
    setIsEditing(false)
  }

  return (
    <div style={styles.todoItem}>
      <input
        type="checkbox"
        style={styles.checkbox}
        onChange={() => toggleCompleted(todo.id)}
        checked={todo.completed}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ ...styles.input, ...styles.text }}
        />
      ) : (
        <p style={{ ...styles.title, ...getTodoTitleStyle(), ...styles.text }}>{todo.title}</p>
      )}
      <div style={styles.buttonContainer}>
        {isEditing ? (
          <button style={styles.saveButton} onClick={handleUpdate}>Save</button>
        ) : (
          <button style={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button style={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>x</button>
      </div>
    </div>
  )
}

const styles = {
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '2px solid #f4f4f4',
    padding: '10px 20px',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  checkbox: {
    height: '18px',
    width: '18px',
  },
  title: {
    flex: 1,
    margin: '0 10px',
  },
  input: {
    flex: 1,
    margin: '0 10px',
    boxSizing: 'border-box',
    border: 'none',
    padding: '0 10px',
  },
  text: {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '32px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#00BB00',
    color: '#fff',
    height: '30px',
    width: '60px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px',
  },
  saveButton: {
    backgroundColor: '#0077BB',
    color: '#fff',
    height: '30px',
    width: '60px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px',
  },
  deleteButton: {
    backgroundColor: '#BB0000',
    color: '#fff',
    height: '30px',
    width: '30px',
    borderRadius: '100%',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px',
  },
}

export default TodoItem