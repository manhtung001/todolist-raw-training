import React, { Component } from 'react';


class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        };
    };

    componentWillMount() {          // trường hợp ấn vào sửa
        if (this.props.task){                       // nếu cái task tồn tại, trông TH khi ấn vào thêm công việc thì : task === null
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        };
    }

    componentWillReceiveProps(nextProps) {     
        if (nextProps && nextProps.task){                       // TH ấn vào thêm công việc , SAU ĐÓ ấn vào sửa 
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        } else if (nextProps && nextProps.task === null){   // TH ấn vào sửa , SAU ĐÓ ấn thêm
            this.setState({
                id : '',
                name : '',
                status : false
            });
        }
    }

    onHandleChange = (event) => {
        var name  = event.target.name;
        var value = event.target.value;

        if (name === 'status') {
            value = event.target.value === 'true' ? true : false
        }

        this.setState({
            [name] : value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();						
        this.props.onReceiveAddTask(this.state);
        this.onClear();
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id : '',
            name : '',
            status : false
        });
    };

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    render() {
        
        return (
            <div className="panel panel-warning">

                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.id === '' ? 'Thêm công việc' : 'Sửa công việc'}</h3>
                    <br/>
                    <button type="button" className="btn btn-danger" onClick={this.onCloseForm}>Hủy</button>
                </div>

                <div className="panel-body">

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                            type="text" 
                            className="form-control"
                            name = "name"
                            value = {this.state.name}
                            onChange = {this.onHandleChange}
                            />
                        </div>

                        <label>Trạng Thái :</label>

                        <select 
                        className="form-control"
                        required="required"
                        name = 'status'
                        value = {this.state.status}
                        onChange = {this.onHandleChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>

                        <br/>

                        <div className="text-center">
                            <button 
                            type="submit" 
                            className="btn btn-warning"
                            >
                            {this.state.id === '' ? 'Thêm' : 'Sửa'}
                            </button>&nbsp;
                            <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={this.onClear}
                            >Xóa
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        );

    }
}

export default TaskForm;

