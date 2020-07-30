import React, { Component } from 'react'
import classNames from 'classnames';
import './TodoItem.css';
import checkImg from '../../img/circle.svg';
import checkDone from '../../img/correct.svg';
import deL from '../../img/uncheck.svg';
import edit from '../../img/edit.svg';


class TodoItem extends Component {
    deLete = (id) =>{
        this.props.deLete(id);
    }
    render() {
        const {item, onClick, onEdit, children} = this.props
        let urlcheck = checkImg;
        if(item.isComplete){
            urlcheck = checkDone
        }
        const className = classNames({
            'TodoItem': !item.isComplete,
            'TodoItem-complete': item.isComplete
        })
        return (
            <div className="All">
                <div className={className}>
                    <img onClick={onClick} src={urlcheck} width={32} height={32} />
                    <p>{this.props.item.title}</p>
                    {children}
                    <div>
                        <img onClick={onEdit}  src={edit} width={16} height={16}/>
                        <img onClick={() => this.deLete(item.id)} src={deL} width={16} height={16} />
                    </div>         
                </div>
            </div>
        )
    }
}

export default TodoItem
