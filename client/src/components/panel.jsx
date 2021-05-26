import React, { Component } from 'react'
import Table from '../components/Table'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import Resolution from '../components/resolution'
import {Tooltip, Button, Popover} from '@material-ui/core'
import { Resizable, ResizableBox  } from 're-resizable'
import AddEventForm from './addEventForm'
import { ThirdPartyDraggable } from '@fullcalendar/interaction'
export default class Panel extends Component {

    state = {
        resolutionClass : "resolution",
        eventFormShow : false,
        date : {
            event_date : '',
            event_time : ''
        },
        box : {
            width : 500,
            height : 25
        },
        addEventPop : false
    }
    onResize = (event, {element, size, handle}) => {
        this.setState({ box : { width: size.width, height: size.height } })
        console.log(this.state.box)
    }

    addEvent = () => {
        this.setState({ eventFormShow : true })
    }
    closeAddEventForm = () => {
        this.setState({ eventFormShow : false })
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

    startResize = () => {
        console.log('resizing started')
    }
    stopResize = (e, direction, ref, d) => {
            this.setState({ box : { width:this.state.box.width, height: this.state.box.height + d.height }, addEventPop : true })
    }

    eventPopClose = () => {
        this.setState({ addEventPop : false })
    }
    render() {
        const open = this.state.addEventPop
        const id = open ? 'simple-popover' : undefined
        return (
            <div className="p-5">
                <AddEventForm show={this.state.eventFormShow} onTimeChange={this.handleTimeChange} date="" onDateChange={this.handleDateChange} onHide={this.closeAddEventForm}/>
                <div className="black-rect"></div>
                <Resolution classes={this.state.resolutionClass} closeResolution={this.closeResolution}/>
                <div className="event-search">
                    <div className="row m-0">
                        <SearchOutlinedIcon className="icon"/>
                        <input type="text" placeholder="search your events..." className='event-search-input'/>
                        <Tooltip title="add event" onClick={this.addEvent}>
                            <i className="fa fa-plus event-add-icon"/>
                        </Tooltip>
                        <Tooltip title="add resolution">
                            <Button variant="outlined" className="ml-2" onClick={this.openResolution}>Add resolution</Button>
                        </Tooltip>
                    </div>
                    
                </div>
                <div className="row m-0 w-100">
                    <div className="p-0 col-md-5">
                        <Table/>
                    </div>
                    <div className="col-md-6 p-0">
                        <div  aria-describedby={id} className="daywise-sch">
                            <div className="back-grids">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <Resizable
                            // snap = {0, 20}
                            grid={[0, 11.25]}
                            // snapGap = "14"
                            aria-describedby={id}
                            maxWidth="200"
                            minWidth='200'
                            minHeight="15"
                            maxHeight="1080"
                            className="resizable-box"
                            onResizeStart={this.startResize}
                            // onResizeStop={this.stopResize}
                            size={{ width: this.state.box.width, height: this.state.box.height }}
                            onResizeStop={this.stopResize}
                            >
                            </Resizable>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={this.state.addEventPop}
                                onClose={this.eventPopClose}
                                // anchorOrigin={{
                                //     vertical: 'center',
                                //     horizontal: 'left',
                                //   }}
                                //   transformOrigin={{
                                //     vertical: 'center',
                                //     horizontal: 'left',
                                //   }}
                            >
                    <p>The content of the Popover.</p>
                </Popover>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}