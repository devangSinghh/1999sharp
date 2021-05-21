import React, { Component } from 'react'
import Table from '../components/Table'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import Resolution from '../components/resolution'
import {Tooltip, Button} from '@material-ui/core'
export default class Panel extends Component {

    state = {
        resolutionClass : "resolution"
    }

    openResolution = () => {
        if(this.state.resolutionClass === "resolution")
            this.setState({ resolutionClass : "resolution-open" })
        else
            this.setState({ resolutionClass : "resolution" })
    }
    closeResolution = () => {
        // if(this.state.resolutionClass === "resolution-open")
            this.setState({ resolutionClass : "resolution" })
    }

    render() {
        return (
            <div className="p-5">
                <div className="black-rect"></div>
                <Resolution classes={this.state.resolutionClass} closeResolution={this.closeResolution}/>
                <div className="event-search">
                    <div className="row m-0">
                        <SearchOutlinedIcon className="icon"/>
                        <input type="text" placeholder="search for events...tags...people" className='event-search-input'/>
                        <Tooltip title="add event">
                            <i className="fa fa-plus event-add-icon"/>
                        </Tooltip>
                        <Tooltip title="add resolution">
                            <Button variant="contained" style={{backgroundColor:"#ff9999", borderColor: '#ff9999', color:'white' }} className="ml-2" onClick={this.openResolution}>Add resolution</Button>
                        </Tooltip>
                    </div>
                    
                    
                </div>
                <Table/>
            </div>
        );
    }
}