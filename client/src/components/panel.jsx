import React, { Component } from 'react'
import Table from '../components/Table'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import Tooltip from '@material-ui/core/Tooltip'
export default class Panel extends Component {
    render() {
        return (
            <div className="p-5">
                <div className="event-search">
                    <div className="row m-0">
                        <SearchOutlinedIcon className="icon"/>
                        <input type="text" placeholder="search for events...tags...people" className='event-search-input'/>
                        <Tooltip title="add event">
                            <i className="fa fa-plus event-add-icon"/>
                        </Tooltip>
                    </div>
                    
                    
                </div>
                <Table/>
            </div>
        );
    }
}