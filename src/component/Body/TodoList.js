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
            TodoItems: [
                { id: 1, title: 'I do first', isComplete: false, showEditForm: false},
                { id: 2, title: 'huhu', isComplete: false, showEditForm: false},
                { id: 3, title: 'Hehe', isComplete: false, showEditForm: false}
            ]
        }
        
        this.createItems = this.createItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkAl = this.checkAl.bind(this);
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });

    };
    handleEditSubmit = (event) => {
        event.preventDefault();
    
        let key = this.state.id;
        this.setState(prevState => ({
            TodoItems: prevState.TodoItems.map(
                elm => elm.id === key ? {
                ...elm,
                title: this.state.title,
                isComplete: false
                }: elm
            ),
            modalIsOpen: false
        
        }))
        console.log(key)
    };
    onItemClicked(item) {
        return (event) => {
          const isComplete = item.isComplete;
          const { TodoItems } = this.state;
          const index = TodoItems.indexOf(item);
          this.setState({
            TodoItems: [...TodoItems.slice(0, index),{...item, isComplete: !isComplete}, ...TodoItems.slice(index + 1)]
          });
        };
    }
    checkAl(event){
    let TodoItems = this.state.TodoItems;
    TodoItems.forEach(TodoItem => {
        if(TodoItem.value === event.target.value){
        TodoItem.isComplete = event.target.checked
        }
    });
    console.log(event.target.value);
    this.setState({isComplete: TodoItems});
    }
    createItems(event) {
    if(event.keyCode === 13){
        let text = event.target.value;
        if(!text) {
        return;
        }
        text = text.trim();
        if(!text) {
        return;
        }
        this.setState({
        newItems: '',
        TodoItems: [
            ...this.state.TodoItems,
            { title: text, isComplete: false}
        ]
        });   
    }
    }
    onChange(event) {
    this.setState({
        newItems: event.target.value
    });
    }
    deleteTask  = (id) =>{
        const { TodoItems } = this.state;
        // const item = TodoItems.filter(TodoItems.id===id)
        // const index = TodoItems.indexOf(id);
        const index = TodoItems.findIndex(item=>item.id===id)
        if(index !== -1){
        let TodoItem = TodoItems.splice(index, 1)
        this.setState({title: TodoItem})
        }
        
        // this.setState({title: TodoItems});
        console.log(id);
    }
    componentWillMount() {
        Modal.setAppElement('body');
    };
    openModal = (item) => {
        // const {TodoItems} = this.state
        this.setState({
            modalIsOpen: true,
            id: item.id,
            title: item.title
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    };
    render() {
        const { TodoItems, newItems } = this.state;
        return (
            <div className="boxwhite">
                <div className="head">
                    <img onClick={this.checkAl} src={checkAll} width={32} height={32} />
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
                    <form onSubmit={this.handleEditSubmit}>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} /> 
                        <button type="submit"><img src={checkAll} width={32} height={32}/></button>
                    </form>
                    <button onClick={this.closeModal}>Close</button>
                </Modal>
            </div>
        )
    }
}

export default TodoList
