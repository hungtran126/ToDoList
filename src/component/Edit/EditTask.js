import React, { Component } from 'react'
import '../Body/TodoItem.css'
import Task from './Task'

class EditTask extends Component {
    constructor(props){
        super(props)
        this.state = {
            newItems: '',
            TodoItems: []
        }
    }
    render() {
        const {TodoItems} = this.state
        return (
            <div className="boxwhite">
                <Task onClick={this.doEdit} tid={TodoItems.name} />
            </div>                  
        )
    }
}

export default EditTask
