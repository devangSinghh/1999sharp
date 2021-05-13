import React, { Component } from 'react'

class ContextMenu extends Component {

    state = {
        xPos: "0px",
        yPos: "0px",
        showMenu: false
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick)
        document.addEventListener("contextmenu", this.handleContextMenu)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick)
        document.removeEventListener("contextmenu", this.handleContextMenu)
    }

    handleClick = (e) => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    handleContextMenu = (e) => {
        e.preventDefault()

        this.setState({ xPos: `${e.pageX}px`, yPos: `${e.pageY}px`, showMenu: true })

    }

    render() {
        const { showMenu, xPos, yPos } = this.state
        return (
            <div className="context-menu" style={{position:'absolute', top: yPos, left: xPos }}>
                {showMenu && <ul className="">
                    <li>Login</li>
                    <li>Register</li>
                    <li>Open Profile</li>
                </ul>}
            </div>
        );
    }
}

export default ContextMenu;