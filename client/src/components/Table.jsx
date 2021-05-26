import React, { Component } from 'react'
import { motion } from 'framer-motion'
import IconButton from '@material-ui/core/IconButton'
import AlarmIcon from '@material-ui/icons/Alarm';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip'
import axios, {base} from '../axios-sh'
import { Link } from 'react-router-dom'

import Loader from './loader'
import Materialtable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import id from 'date-fns/esm/locale/id/index.js';

export default class Table extends Component {

    state = {
        events : [],
        loading : false,
        eventToggle : 'event-toggle',
        key : ''
    }

    componentDidMount = async() => {
        document.addEventListener('click', this.handleClickOutside, true)
        const { dat : events } = await axios.get('')
        this.setState({ events, loading : false })
    }
    componentWillUnmount = async() => {
        document.removeEventListener('click', this.handleClickOutside, true)
    }

    handleClickOutside = e => {
        if (this.ref.current && !this.ref.current.contains(e.target)) {
            this.closeToggle(e)
        }
    }

    closeToggle = (e) => {
        this.setState ({ eventToggle : 'event-toggle' })
    }

    ref = React.createRef()

    table=[
        {
            name : "dsfdf",
            date : 'sdfdsf',
            time : 'dsfdsf'
        },
        {
            name : "wqejkqw",
            date : 'cvncxmv',
            time : 'dsfdsf'
        },
        {
            name : "qwerty",
            date : 'dkfj',
            time : 'dsfdsf'
        },
        {
            name : "mnvnwjekn",
            date : 'erufhhjkf',
            time : 'dsfdsf'
        },
    ]

    openThisEventToggle = (e, key) => {
        const eventClass = this.state.eventToggle
        if(eventClass === 'event-toggle')
        this.setState({ eventToggle : 'event-toggle-open', key:key })
        else 
        this.setState({ eventToggle : 'event-toggle', key:'' })
    }
    

    render() {
        const togglekey = this.state.key
        const toggleClass = this.state.eventToggle
        const el = this.state.loading ? <Loader/> : 
        <div className="col-md-12 mt-4 p-0">
            <h1 className="s-e-h">Scheduled events
            <IconButton color="secondary" aria-label="add an alarm">
            <AlarmIcon />
            </IconButton>
            </h1>
            <TableContainer>
                <Materialtable aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell align="left">created on</TableCell>
                            <TableCell align="left">scheduled on</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.table.map((m, key) => 
                            <TableRow key={key}>
                            <TableCell component="td" scope="row">
                                {m.name}
                            </TableCell>
                            <TableCell component="td" scope="row">
                                {m.date}
                            </TableCell>
                            <TableCell onClick={e => this.openThisEventToggle(e, key)} component="td" scope="row">
                                {m.time}
                                {/* <Tooltip title="more"> */}
                                    <MoreHorizIcon color="action" className="ml-3 more-icon" fontSize="small" fontSize="small" />
                                {/* </Tooltip> */}
                                <div key={key} ref={this.ref} className={togglekey === key ? this.state.eventToggle : 'event-toggle'}>
                                    <ul>
                                        <li>sjkhd</li>
                                        <li>dsfdsf</li>
                                        <li>dsfsdf</li>
                                    </ul>
                                </div>
                            </TableCell>
                        </TableRow>
                            )}
                    </TableBody>
                </Materialtable>
        </TableContainer>
            {/* <p className="event-number">{table.length} events scheduled</p> */}
        </div>

        return (el)
    }
}
