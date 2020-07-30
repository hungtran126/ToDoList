import React, { Component } from 'react'
import '../Body/TodoItem.css'

class Task extends Component {

    render() {
        const {onClick, setvalue} = this.props
        return (
            <div className="All">
                <h2>Edit</h2>
                <input type="text" defaultValue={setvalue} placeholder={this.props.tid} /> <br />
                <button type="submit" onClick={onClick}>Edit</button>
                <button type="button" className="btn btn-default">Back</button>
            </div>
        )
    }
}

export default Task