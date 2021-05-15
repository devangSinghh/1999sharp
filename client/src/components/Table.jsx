import React, { Component } from 'react'
import { motion } from 'framer-motion'
import axios, {base} from '../axios-sh'
import { Link } from 'react-router-dom'
import Loader from './loader'

class Table extends Component {

    state = {
        events : [],
        loading : true
    }

    componentDidMount = async() => {
        const { dat : events } = await axios.get('')
        this.setState({ events })
    }
    

    render() {
        const el = this.state.loading ? <Loader/> : 
        <div>
            <table>
                
            </table>
        </div>

        return (el)
    }
}

export default Table;