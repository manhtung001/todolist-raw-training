import React, { Component } from 'react';



class TaskSortControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort : {
                by : 'name',
                value : 1
            }
        };
    };

    onClick = (sortBy, sortValue) => {
        this.setState({
            sort : {
                by : sortBy,
                value : parseInt(sortValue)
            }
        })
        this.props.onSort(sortBy, sortValue);
    };

    render() {
        
        return (
      
            <div className="dropdown">
                <button 
                className="btn btn-primary dropdown-toggle" 
                type="button" id="dropdownMenu1" 
                data-toggle="dropdown" 
                aria-haspopup="true"
                aria-expanded="true">
                    Sắp Xếp <span className="ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    
                    <li 
                    className={this.state.sort.by === 'name' && this.state.sort.value === 1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('name', 1)}
                    >
                        <a role="button">
                                    <span>
                                        Tên A-Z
                                    </span>
                                </a>
                    </li>

                    <li 
                    className={this.state.sort.by === 'name' && this.state.sort.value === -1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('name', -1)}
                    >
                        <a role="button">
                                    <span className="fa fa-sort-alpha-desc pr-5">
                                        Tên Z-A
                                    </span>
                                </a>
                    </li>

                    <li role="separator" className="divider"></li>

                    <li
                    className={this.state.sort.by === 'status' && this.state.sort.value === 1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('status', 1)}
                    ><a role="button">Trạng Thái Kích Hoạt</a></li>

                    <li
                    className={this.state.sort.by === 'status' && this.state.sort.value === -1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('status', -1)}
                    ><a role="button">Trạng Thái Ẩn</a></li>
                </ul>
            </div>
                
            
        );

    }
}

export default TaskSortControl;

