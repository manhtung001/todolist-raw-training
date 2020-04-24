import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TaskControl from './TaskControl';
import TaskList from './TaskList';
import './Product.css'



class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditing : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sortBy : 'name',
            sortValue : 1
        };
    };

    componentDidMount() {      // được gọi khi F5 lại, và chỉ được gọi duy nhất 1 lần

        if ( localStorage && localStorage.getItem('tasks')) {       // kiểm tra nếu tồn tại và khác rỗng

            var tasks1 = JSON.parse(localStorage.getItem('tasks'));     // vì vừa nãy biến thành string nên giờ parse lại để cho nó về object
            this.setState({
                tasks : tasks1
            });
        }
    };

    statusOfForm = () => {
        if(this.state.isDisplayForm && this.state.taskEditing !== null) {       // đang ấn vào sửa sau đó ấn vào thêm
            this.setState({
                isDisplayForm : true,
                taskEditing : null
            });
        } else {
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditing : null
            });
        }
    };

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        });
    }

    findIndex = (id) => {
        var index2  = -1;
        this.state.tasks.forEach((task, index) => {             // lấy index
            if (task.id === id) {
                index2 = index;
                return index2
            }
        });
        return index2
    };

    addTask = (data) => {                               // cả thêm và sửa đều trong này
        var tasks = this.state.tasks;

        if (data.id === '') {                           // nếu không có id thì là thêm
            data.id = this.onSetID();
            tasks.push(data);
        } else {                                        // nếu có id thì là sửa
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        
        this.setState({
            tasks : tasks,
            taskEditing : null
        });
        // Lưu Trữ ở localStorage
        localStorage.setItem('tasks' , JSON.stringify(tasks))  // chuyển về dạng string để lưu cho dễ
    };

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    onSetID = () => {
        return this.s4() + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
    }

    onUpdateStatus = (id) => {
        var tasks = this.state.tasks;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;       // đổi status của cái cần
            this.setState({
                tasks : tasks                                   // cập nhật lại state
            })
            localStorage.setItem('tasks' , JSON.stringify(tasks))
        }
    };
    
    onDelete = (id) => {
        var tasks = this.state.tasks;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);                             // xóa
            this.setState({
                tasks : tasks                                   // cập nhật lại state
            })
            localStorage.setItem('tasks' , JSON.stringify(tasks))
        }
        // khi ấn xóa thì đóng form thêm lại
        this.onCloseForm();
    };

    onUpdate = (id) => {
        var tasks = this.state.tasks;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });

        this.onShowForm();
    };

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);      // vì filterStatus nhận về là string nên parse sang number
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
    };

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword.toLowerCase()
        })
    };

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        })
    };

    onTest = () => {
        console.log(this.state)
    }


    render() {

        var tasks = this.state.tasks;      // dùng để truyền task vào cho taskList

        var {isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue} = this.state // var isDisplayForm = this.state.isDisplayForm
        
        //          FILTER

        if (filter) {

            // filter name

            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1
                });
            }
          
            // filter status    
            
            tasks = tasks.filter((task) => {
                        if (filter.status === -1) {
                            return true
                        } else {
                            return task.status === ( filter.status === 1 ? true : false )
                        }
                    });            
        };

                // SEARCH

        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            });
        };

                // SORT 

        if (sortBy === 'name') {                    // viết tắt cả 2 trg hợp 1 và -1
            tasks.sort((a, b) => {                  // VD: Trg hợp 1 => tăng dần    (a<b<c<d)
                if (a.name > b.name) return sortValue;      // nếu chữ trước theo bảng chữ cái đững đằng sau => sắp xếp
                else if (a.name < b.name) return -sortValue; // nếu chữ trước theo bảng chữ cái đững đằng trước => KHÔNg sắp xếp
                else return 0;
            })
        }

        if (sortBy === 'status') {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            })
        }

        var elmForm = isDisplayForm ? 
        <TaskForm 
        onReceiveAddTask = {this.addTask}
        onCloseForm = {this.onCloseForm}
        task = {taskEditing}
        /> : '';
        // onCloseForm để nhận khi ấn click vào nút x ở taskform
        
        return (
            <div className="container">
                
                <button 
                type="button" 
                className="btn btn-danger"
                onClick={this.onTest}
                >Test</button>
                
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
            
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>    {/* nếu true thì cho 4 cột, false thì k có gì */}    
                        {elmForm}
                    </div>

                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}> {/*  nếu true thì cho 8 cột, false thì 12 cột */}
                        <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick = {this.statusOfForm} //   Khi Click vào thì đổi trạng thái of Form 
                        >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        
                        <TaskControl 
                        onSearch = {this.onSearch}
                        onSort = {this.onSort}
                        />

                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                
                                < TaskList 
                                tasks = {tasks} 
                                onUpdateStatus={this.onUpdateStatus} 
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                                onFilter={this.onFilter}
                                />      {/* truyền task vào cho taskList */}  
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Product;

