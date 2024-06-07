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
    marginTop:'10px',
    marginBottom: '22px',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    width: '800px',
  },
  formInput: {
    height: '60px',
    flex: 2,
    width: '70%',
    fontSize: '20px',
    padding: '0 16px',
    boxSizing: 'border-box',
  },
  
}

export default TodoForm