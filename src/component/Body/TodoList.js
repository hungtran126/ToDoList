import React, { Component } from 'react'
import TodoItem from './TodoItem'
import './TodoItem.css'
import checkAll from '../../img/checkall.svg'
import Modal from 'react-modal'

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalIsOpen: false,
            newItems: '',
            id: '',
            title: '',
            TodoItems: []
        }
        this.createItems = this.createItems.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
          [name]: value
        })
    }
    handleEditSubmit = (event) => {
        event.preventDefault()
    
        let key = this.state.id;
        this.setState(prevState => ({
            TodoItems: prevState.TodoItems.map(
                item => item.id === key ? { 
                    ...item,
                    title: this.state.title,
                    isComplete: false
                }: item
            ),
            modalIsOpen: false
        
        }))
    }
    onItemClicked(item) {
        return () => {
          const isComplete = item.isComplete
          const { TodoItems } = this.state
          const index = TodoItems.indexOf(item)
          this.setState({
            TodoItems: [...TodoItems.slice(0, index),{...item, isComplete: !isComplete}, ...TodoItems.slice(index + 1)]
          })
        }
        
    }
    createItems(event) {
        if(event.keyCode === 13){
            let text = event.target.value
            if(!text) {
                return
            }
            text = text.trim()
            if(!text) {
                return 
            }
            const {TodoItems} = this.state
            let idd = 0
            for(idd = 0; idd<TodoItems.length; idd++){}
            this.setState({
                newItems: '',
                TodoItems: [
                    ...this.state.TodoItems,
                    {id: idd, title: text, isComplete: false}
                ]
            })   
        }
    }
    onChange(event) {
        this.setState({
            newItems: event.target.value
        })
    }
    deleteTask  = (id) =>{
        const { TodoItems } = this.state
        const index = TodoItems.findIndex(item=>item.id===id)
        if(index !== -1){
            let TodoItem = TodoItems.splice(index, 1)
            this.setState({title: TodoItem})
        }
    }
    componentDidMount() {
        Modal.setAppElement('body')
    }
    openModal = (item) => {
        this.setState({
            modalIsOpen: true,
            id: item.id,
            title: item.title
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }
    render() {
        const { TodoItems, newItems } = this.state
        return (
            <div className="boxwhite">
                <div className="head">
                    <input type="text" placeholder="Add a new item" value={newItems} onChange={this.onChange} onKeyUp={this.createItems} />
                </div>
                {TodoItems.length > 0 && TodoItems.map((item) => <TodoItem key={item.id}
                                                                            item={item} 
                                                                            onClick={this.onItemClicked(item)} 
                                                                            deLete={this.deleteTask} 
                                                                            onEdit={() => this.openModal(item)} 
                />)}
                {TodoItems.length === 0 && <h5>Nothing here</h5>}
                <Modal className="modals"
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}>
                    <h1 className="text-center">Edit</h1>
                    <form onSubmit={this.handleEditSubmit}>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} /> 
                        <button type="submit"><img src={checkAll} width={32} height={32} alt="img1" /></button>
                    </form>
                    <button onClick={this.closeModal} className="">Close</button>
                </Modal>
            </div>
        )
    }
}

export default TodoList
