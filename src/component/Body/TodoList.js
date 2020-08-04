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
        this.checkAl = this.checkAl.bind(this)
    }
    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
          [name]: value
        })
        console.log(target)
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
        console.log(key)
    }
    onItemClicked(item) {
        return () => {
          const isComplete = item.isComplete
          const { TodoItems } = this.state
          const index = TodoItems.indexOf(item)
          this.setState({
            TodoItems: [...TodoItems.slice(0, index),{...item, isComplete: !isComplete}, ...TodoItems.slice(index + 1)]
          })
          console.log(index)
        }
        
    }
    checkAl(event){
        let TodoItems = this.state.TodoItems
        TodoItems.forEach(TodoItem => {
            if(TodoItem.value === event.target.value){
            TodoItem.isComplete = event.target.checked
            }
        })
        console.log(event.target.value)
        this.setState({isComplete: TodoItems})
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
        
        // this.setState({title: TodoItems})
        console.log(index)
    }
    componentWillMount() {
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
                    {/* <img onClick={this.checkAl} src={checkAll} width={32} height={32} alt="img" /> */}
                    <input type="text" placeholder="Add a new item" value={newItems} onChange={this.onChange} onKeyUp={this.createItems} />
                </div>
                {TodoItems.length > 0 && TodoItems.map((item) => <TodoItem key={item.id}
                                                                            item={item} 
                                                                            onClick={this.onItemClicked(item)} 
                                                                            deLete={this.deleteTask} 
                                                                            onEdit={() => this.openModal(item)} 
                                                                            tid={item.id}
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
