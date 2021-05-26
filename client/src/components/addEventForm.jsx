import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton, Button } from '@material-ui/core'
import { moment } from 'moment'

//to install date-fns stable version run => npm i @date-io/date-fns@1.x date-fns
import DateFnsUtils from '@date-io/date-fns'

//Date picker
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'

class AddEventForm extends Component {

    state = {
        picker_time : '',
        data : {
            event_date : new Date(),
            event_time : new Date()
        }
    }

    handleDateChange = date => {
        const data = {...this.state.data}
        data['event_date'] = date.toLocaleDateString()
        console.log(data['event_date'])
        this.setState({ data })
    }

    handleTimeChange = date => {
        const data = {...this.state.data}
        console.log()
        data['event_time'] = date.toLocaleTimeString()
        data['picker_time'] = date.getTime()
        this.setState({ data })
    }

    render() {
        return (
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add event
        </Modal.Title>
        <IconButton onClick={this.props.onHide}>
            <CloseIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={this.state.data.event_date}
            onChange={this.handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            />
            <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={this.state.data.picker_time}
          onChange={this.handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="contained" color="primary" onClick={this.props.onHide}>Close</Button>
        {/* <button className="add-event-form-button" >Close</button> */}
      </Modal.Footer>
    </Modal>
        );
    }
}

export default AddEventForm;