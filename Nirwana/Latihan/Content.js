import React from 'react';

class ItemTugas extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='taskItemStyle'>
                <p>{this.props.task}</p>
            </div>
        )
    }

}

export default ItemTugas;