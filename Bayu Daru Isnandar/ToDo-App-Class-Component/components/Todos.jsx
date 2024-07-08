import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todos extends React.Component {
  render() {
    const { todos, toggleCompleted, deleteTodo } = this.props;

    return (
      <div style={styles.container}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} />
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    width: '40%',
    margin: '0 auto',
  },
};

export default Todos;


/*
const Todos = ({todos, toggleCompleted, deleteTodo}) => {
    return (
        <div style={styles.container}>
            {todos.map((todo) => {
                return <TodoItem key={todo.id} todo={todo} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo}/>
            })}
        </div>
    )
}

const styles = {
    container: {
        width: '40%',
        margin: '0 auto',
    }
}
export default Todos

*/