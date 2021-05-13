import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'

export default class Calendar extends Component {
    handleDateClick = arg => {
        alert(arg.dateStr)
      }

    render() {
      return (
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
          events={[
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' }
          ]}
          headerToolbar= {{
            // right: 'dayGridMonth,timeGridWeek,timeGridDay'
            right : 'prev today next'
          }}
        />
      )
    }
  }