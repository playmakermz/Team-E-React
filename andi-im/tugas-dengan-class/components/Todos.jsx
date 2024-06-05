import React from "react";
import TodoItem from "./TodoItem";

class Todos extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        {this.props.todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    width: "40%",
    margin: "0 auto",
  },
};
export default Todos;
