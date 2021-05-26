import React, { Component } from 'react'
import CancelIcon from '@material-ui/icons/Cancel'
import { IconButton } from '@material-ui/core'

class Resolution extends Component {
    
    ref = React.createRef()

    componentDidMount = async() => {
        document.addEventListener('click', this.handleClickOutside, true)
    }

    componentWillUnmount = async() => {
        document.removeEventListener('click', this.handleClickOutside, true)
    }
    handleClickOutside = e => {
        if (this.ref.current && !this.ref.current.contains(e.target)) {
            this.props.closeResolution()
        }
    }

    render() {
        return (
            <div ref={this.ref} className={this.props.classes + ''}>
                <IconButton onClick={this.props.closeResolution}>
                    <CancelIcon />
                </IconButton>
                <p className=" visibilityDiv">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, placeat provident, est incidunt deserunt eaque animi odit quasi laudantium, veniam expedita assumenda dolores in. Quas magni magnam illo veniam ullam!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dignissimos, eligendi neque illum doloribus fugit asperiores, est optio placeat dicta laudantium cum ipsa id vitae, facere minus similique repellat adipisci?
                </p>
            </div>
        );
    }
}

export default Resolution;