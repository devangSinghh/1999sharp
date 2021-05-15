import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'

import Cookies from 'js-cookie'

class Sidebar extends Component {

    state = {
        width : "300px"
    }

    ref = React.createRef()

    render() {
        const width = this.props.width
        // document.body.style.overflow = width !== "-300px" ? "hidden" : "visible"
        return (
            <div>
                <ul ref={this.props.ref} className="sideBar p-0" style={{ left:`${width}`, width: `300px`, height:"100%",  }}>
                    <div className="sidebar-brand">1999Sharp</div>
                        <div className="sidebar-close-btn" onClick={this.props.close}>
                            <CloseIcon />
                        </div>
                </ul>
            </div>
        );
    }
}

export default Sidebar;