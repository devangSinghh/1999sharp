import React, { Component } from 'react'
import Calendar from '../components/calendar'

import Navbar from '../components/Navbar'
import Panel from '../components/panel'
import ContextMenu from '../components/ContextMenu'

class Dashboard extends Component {

    state = {
        pos : { x:0, y:0 },
        left : 0,
        resolutionClass : "resolution"
    }

    openResolution = () => {
        if(this.state.resolutionClass === "resolution")
            this.setState({ resolutionClass : "resolution-open" })
        else
            this.setState({ resolutionClass : "resolution" })
    }

    render() {
        return (
            <div className="container-fluid p-0">
                {/* <ContextMenu/> */}
                <div className="row d-flex m-0">
                    <div className="col-md-3 p-0 dash-left-panel">
                        <h3 className="main-brand">1999Sharp</h3>
                        <div className="c-wrapper p-3">
                            <Calendar/>
                        </div>
                        <hr className="divider"/>
                    </div>
                    <div className="col-md-9 p-0 dash-right-panel">
                        <Navbar/>
                        <Panel />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;