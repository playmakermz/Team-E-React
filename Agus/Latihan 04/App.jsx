import React, { useState } from "react"

const App = () => {
  const styles = {
    app: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "100vh",
    },
    card: {
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      width: "40%",
      maxWidth: "400px",
    },
    counterBtn: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#007bff", // Warna biru
      color: "#fff",
      cursor: "pointer",
      marginRight: "10px",
      transition: "background-color 0.3s",
    },
    formSubmitBtn: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#28a745", // Warna hijau
      color: "#fff",
      cursor: "pointer",
      marginRight: "10px",
      transition: "background-color 0.3s",
    },
    formInput: {
      padding: "8px",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      marginBottom: "10px",
      width: "calc(100% - 20px)",
    },
    error: {
      color: "#721c24", // Warna merah gelap
    },
    inputResult: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
  }

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <Counter styles={styles} />
      </div>
      <div style={styles.card}>
        <FormSubmit styles={styles} />
      </div>
    </div>
  )
}

const Counter = ({ styles }) => {
  const [count, setCount] = useState(0)
  const [missionCompleted, setMissionCompleted] = useState(false)

  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1
      if (newCount === 5) setMissionCompleted(true)
      return newCount
    })
  }

  const handleDecrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount - 1
      if (newCount === -5) setMissionCompleted(true)
      return newCount
    })
  }

  return (
    <div>
      <h2>Counter App</h2>
      <p>{count}</p>
      {missionCompleted ? (
        <p style={styles.inputResult}>Kamu menyelesaikan tugas mantap</p>
      ) : (
        <>
          <button onClick={handleDecrement} style={styles.counterBtn}>
            -
          </button>
          <button onClick={handleIncrement} style={styles.counterBtn}>
            +
          </button>
        </>
      )}
    </div>
  )
}

const FormSubmit = ({ styles }) => {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [missionCompleted, setMissionCompleted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input) {
      setError("Input tidak boleh kosong")
      setMissionCompleted(false)
    } else {
      setError("")
      setMissionCompleted(true)
    }
  }

  return (
    <div>
      <h2>Form Submit</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Masukan Nama"
          style={styles.formInput}
        />
        <button type="submit" style={styles.formSubmitBtn}>
          Submit
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {missionCompleted && <p style={styles.inputResult}>Terima kasih!!</p>}
    </div>
  )
}

export default App
