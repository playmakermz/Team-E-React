/* eslint-disable no-useless-constructor */
import React from 'react'

class Item extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div style={styles.item}>
                <p>Buah : {this.props.name} </p>
                <p>Item : {this.props.item}</p>
            </div>
        );
    }
}

const styles = {
    item: {
        padding: "15px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "5px",
        margin: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, boxShadow 0.3s",
    },
};

export default Item
