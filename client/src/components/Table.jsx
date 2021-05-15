import React, { Component } from 'react'
import { motion } from 'framer-motion'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip'
import axios, {base} from '../axios-sh'
import { Link } from 'react-router-dom'
import Loader from './loader'

export default class Table extends Component {

    state = {
        events : [],
        loading : false
    }

    componentDidMount = async() => {
        const { dat : events } = await axios.get('')
        this.setState({ events, loading : false })
    }
    

    render() {
        const tableElem = <tr>
                            <td>dskfksd</td>
                            <td>dskfksd</td>
                            <td className="">
                                dskfksd
                                <Tooltip title="more">
                                        <MoreHorizIcon color="action" className="ml-3" fontSize="small" fontSize="small" />
                                </Tooltip>
                            </td>
                        </tr>
        const table = []
        for(let i=0;i<4;i++) 
            table.push(tableElem)
        const el = this.state.loading ? <Loader/> : 
        <div>
            <table className="event-table table col-md-5 table-borderless ">
                <thead>
                    <tr className="event-table-head">
                        <th>Event</th>
                        <th>Date</th>
                        <th className="">Added on</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
            <p className="event-number">{table.length} events scheduled</p>
        </div>

        return (el)
    }
}
