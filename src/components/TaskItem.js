import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);  // truyền về ông cái id
    };

    onDelete = () => {
        this.props.onDelete(this.props.task.id);  // truyền về ông cái id
    };

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);  // truyền về ông cái id
    };

    render() {
        

        return (
            <tr>
                <td>{this.props.index + 1}</td>                                
                <td>{this.props.task.name}</td>                   
                <td className="text-center">
                    <span 
                    className={this.props.task.status ? 'label label-success' : 'label label-danger'}
                    onClick = {this.onUpdateStatus}
                    >
                    {this.props.task.status ? 'Khích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick = {this.onUpdate}
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick = {this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );

    }
}

export default TaskItem;

