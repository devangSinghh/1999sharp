import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'

import axios, {base} from '../axios-sh'

export default class Calendar extends Component {

    ref = React.createRef()

    state = {
        calendarWeekends: true,
        calendarEvents: [
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' }
        ]
    }

    handleDateClick = async arg => {
        if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
          this.setState({
            // add new event data
            calendarEvents: this.state.calendarEvents.concat({
              // creates a new array
              title: "New Event",
              start: arg.date,
              allDay: arg.allDay
            })
          });
        }
        const payload = {
            title: "events",
            description: "This is event 1",
            date:arg.date,
            created:"today",
            duration : "sdfdsf",
            type: "public"
        }
        // const { data : res } = await axios.post('event/new', payload)
        // console.log(res)
      };

    toggleWeekends = () => {
        this.setState({
          // update a property
          calendarWeekends: !this.state.calendarWeekends
        });
      };

    nextYear = () => {
        let calendar = this.ref.current.getApi()
        calendar.nextYear()
    }

    render() {
        console.log(this.state.calendarEvents)
      return (
        <div className="d-flex w-100 align-items-center">
            {/* <button onClick={this.nextYear}>Toggle</button> */}
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            dateClick={this.handleDateClick}
            ref={this.ref}
            eventContent={renderEventContent}
            // themeSystem="standard"
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            // customButtons = {this.customButtons}
            headerToolbar= {{
                // center: 'dayGridMonth,timeGridWeek,timeGridDay',
                start: '',
                center : 'prevYear prev title next nextYear',
                end : ''
            }}
            />
        </div>
      )
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>dsjfkjdsf</b>
        <i>djkfhkjdshf</i>
      </>
    )
  }