import React, { Component } from 'react'
import '../Body/TodoItem.css'
import Task from './Task'

class EditTask extends Component {
    constructor(props){
        super(props)
        this.state = {
            newItems: '',
            TodoItems: [
                { id: 1, title: 'I do first', isComplete: false, showEditForm: false},
                { id: 2, title: 'huhu', isComplete: false, showEditForm: false},
                { id: 3, title: 'Hehe', isComplete: false, showEditForm: false}
            ]
        }
    }

    // changedName = (e) => {
    //     this.setState({
    //         editItem: { id: this.props.editItem.id, name: e.target.value }
    //     })
    // }
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
