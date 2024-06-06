import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  surprise = () => {
    const randomNum = Math.floor(Math.random() * 201) - 100;
    this.setState({ count: randomNum });
  };

  buttonHover = (e, color) => {
    e.currentTarget.style.backgroundColor = color;
  };

  render() {
    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={styles.counterContainer}>
            <h1 style={styles.h1}>Counter App</h1>
            <a
              href='https://github.com/MuhammadAgusLuthfi'
              target='_blank'
              rel='noopener noreferrer'
              style={styles.subtitle}
            >
              Suga
            </a>
            <p style={styles.count}>{this.state.count}</p>
            <div style={styles.buttonContainer}>
              <button
                style={styles.decrementButton}
                onClick={this.decrement}
                onMouseEnter={(e) => e.target.classList.add('hoverAnimation')}
                onMouseLeave={(e) => e.target.classList.remove('hoverAnimation')}
              >
                Decrement
              </button>
              <button
                style={styles.surpriseButton}
                onClick={this.surprise}
                onMouseEnter={(e) => e.target.classList.add('hoverAnimation')}
                onMouseLeave={(e) => e.target.classList.remove('hoverAnimation')}
              >
                Surprise
              </button>
              <button
                style={styles.incrementButton}
                onClick={this.increment}
                onMouseEnter={(e) => e.target.classList.add('hoverAnimation')}
                onMouseLeave={(e) => e.target.classList.remove('hoverAnimation')}
              >
                Increment
              </button>
            </div>
            <button
              style={styles.resetButton}
              onClick={this.reset}
              onMouseEnter={(e) => e.target.classList.add('hoverAnimation')}
              onMouseLeave={(e) => e.target.classList.remove('hoverAnimation')}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  body: {
    margin: '0',
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#f0f0f0',
    color: '#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  container: {
    textAlign: 'center',
  },
  counterContainer: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
    margin: '0 auto',
  },
  subtitle: {
    display: 'block',
    color: '#888',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  h1: {
    marginBottom: '1rem',
    color: '#333',
  },
  count: {
    fontSize: '3rem',
    marginTop: '20px',
    marginBottom: '20px',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  decrementButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    padding: '10px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  surpriseButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  incrementButton: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    border: 'none',
    padding: '10px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  resetButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
    width: '100%',
  },
};

export default App;
