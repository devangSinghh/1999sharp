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
        const rect = document.getElementById('contextmenu').getBoundingClientRect 
        if (rect.x + rect.width < 0 || (rect.y + rect.height) < 0 || rect.x > window.innerWidth || rect.y > window.innerHeight) {
            this.setState({ xPos: `${e.pageX}px`, yPos: `${e.pageY}px`, showMenu: true })
        }
        this.setState({ xPos: `${e.pageX}px`, yPos: `${e.pageY}px`, showMenu: true })

    }

    render() {
        const { showMenu, xPos, yPos } = this.state
        return (
            <div className="context-menu" id="contextmenu" style={{position:'absolute', top: yPos, left: xPos }}>
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