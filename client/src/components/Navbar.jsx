import React, { Component } from 'react'
import Sidebar from './Sidebar'
import {TextField, Button} from '@material-ui/core'

import axios, { base } from '../axios-sh'

class Navbar extends Component {

    state = {
        width : "-300px",
        results : [],
        loading : true,
        showSearchBox : false
    }

    ref = React.createRef()

    componentDidMount = async() => {
        document.addEventListener('click', this.handleOutside, true);

    }

    componentWillUnmount = () => {
        return () => {
            document.addEventListener('click', this.handleOutside, true);
        };
    }

    ref1 = React.createRef()

    handleOutside = e => {
        {/*If clicked outside of notification box, it will close*/ }
        if (this.ref1.current && !this.ref1.current.contains(e.target)) {
            this.setState({ className: "rg-cart" });
        }
    }

    toggleSideBar = () => {
        this.setState({ width : "0px" })
    }
    toggleSideBarClose = () => {
        this.setState({width : "-300px"})
    }
    handleClickOutside = e => {
        if (this.ref.current && !this.ref.current.contains(e.target)) {
            this.setState({width : "-300px"})
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg w-100" style={{ width:'100%' }}>
                <Sidebar ref={this.ref} open={this.toggleSideBar} close={this.toggleSideBarClose} clickOut={this.handleClickOutside} width={this.state.width}/>
            <h3 className="navbar-brand"></h3>          
            <div className="collapse navbar-collapse w-100" id="nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                  <input type="text" className="search-events" placeholder="search events..."/>
                {/* <TextField id="outlined-basic" label="search events..." variant="outlined" /> */}
                {this.state.showSearchBox && <div className="search-results">

                </div>}
                <Button className="ml-2" variant="contained" color="primary">Search</Button>
              </form>
            </div>
            <button onClick={this.toggleSideBar} className="ml-auto pr-0 navbar-toggler" type="button" 
                data-toggle="collapse" 
                aria-controls="nav__links" aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="icon-bar top-bar" ></span>
                <span className="icon-bar middle-bar" ></span>
                <span className="icon-bar bottom-bar" ></span>
            </button>
          </nav>
        );
    }
}

export default Navbar;