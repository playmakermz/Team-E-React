const TodoItem = ({todo, toggleCompleted, deleteTodo}) => {
    //function untuk mencoret todoItem jika statusnya completed (===true)
    const getTodoTitleStyle = () => {
        if (todo.completed === true) {
            return {textDecoration: 'line-through'};
        } else {
            return {textDecoration: 'none'};
        }
    }

    return (  
        <div style={listStyle.todoItem}>
            <input type="checkbox" style={listStyle.checkbox} onChange={() => toggleCompleted(todo.id)}></input>
            <p style={getTodoTitleStyle()}>{todo.title}</p>
            <button style={listStyle.button} onClick={() => deleteTodo(todo.id)}>x</button>
        </div>
        
    );
}

const listStyle = {
    todoItem: {
        border: '2px solid #f4f4f4',
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
    }, 
    checkbox: {
        height: '18px',
        width: '18px'
    },
    button: {
        backgroundColor: '#BB0000',
        color: '#fff',
        height: '30px',
        width: '30px',
        borderRadius: '100%',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    }
}
 
export default TodoItem;