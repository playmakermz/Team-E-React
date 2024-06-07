import React, { useState } from 'react'

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (input.trim()) {
      addTodo(input)
      setInput('')
    }
  }

  return (
    <div style={styles.container}>
      <form
        onSubmit={(event) => {
          handleSubmit(event)
        }}
        style={styles.form}
      >
        <input
          type="text"
          placeholder="Add your Todo"
          style={styles.formInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" style={styles.button}>Add Todo</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    width: '600px',
  },
  formInput: {
    height: '60px',
    flex: 1,
    width: '70%',
    fontSize: '16px',
    padding: '0 16px',
    boxSizing: 'border-box',
  },
  button: {
    height: '60px',
    width: '30%',
    fontSize: '16px',
    padding: '0 16px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
}

export default TodoForm
