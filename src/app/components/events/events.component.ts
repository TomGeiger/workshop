import { Component } from '@angular/core';
import { EventService, MyEvent, WorkshopEvent } from './event.service';
import { Observable, map, tap } from 'rxjs';
import moment from 'moment';
import { RegistrationService } from '../registration/registration.service';


const filterUpcomingEvents = (events: WorkshopEvent[]) => {
  const now = moment(); // Current date and time
  const twoWeeksFromNow = moment().add(2, 'weeks'); // Two weeks from now

  return events.filter(event => {
    const eventDateTime = moment(`${event.date} ${event.time}`, 'YYYY-MM-DD hh:mm A');
    return eventDateTime.isBetween(now, twoWeeksFromNow, 'day', '[]'); // Only include events in the next two weeks
  });
};

const filterFutureEvents = (events: WorkshopEvent[]) => {
  return events.filter(event => {
    const eventDateTime = moment(`${event.date} ${event.time}`, 'YYYY-MM-DD hh:mm A');
    return eventDateTime.isAfter(moment()); // Only include events in the future
  });
};

const sortEventsByDate = (events: WorkshopEvent[]) => {
  return events.sort((a, b) => {
    const dateA = moment(`${a.date} ${a.time}`, 'YYYY-MM-DD hh:mm A');
    const dateB = moment(`${b.date} ${b.time}`, 'YYYY-MM-DD hh:mm A');
    return dateA.diff(dateB);
  });
};

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  events: WorkshopEvent[] | MyEvent[] | undefined;

  myEvents$ = this.eventService.myEvents$;
  allEvents$ = this.eventService.getEvents();

  events$ = this.allEvents$.pipe(
    map(events => filterFutureEvents(events)),
    map(filteredEvents => filterUpcomingEvents(filteredEvents)),
    map(filteredEvents => sortEventsByDate(filteredEvents))
  );

  constructor(private eventService: EventService, private registrationService: RegistrationService) {}

  ngOnInit(): void {
  }


  setCurrentEvent(event: WorkshopEvent) {
    this.registrationService.setEventType(event.category);
    this.eventService.setCurrentEvent(event);
  }

  selectEvents(type: string) {

    if (type === 'all') {
      this.events$ = this.allEvents$.pipe(
        map(events => filterFutureEvents(events)),
        map(filteredEvents => filterUpcomingEvents(filteredEvents)),
        map(filteredEvents => sortEventsByDate(filteredEvents))
      );
  
    } else {
      this.events$ = this.myEvents$.pipe(
        map(events => filterFutureEvents(events)),
        map(filteredEvents => filterUpcomingEvents(filteredEvents)),
        map(filteredEvents => sortEventsByDate(filteredEvents))
      );  
    }
  }

}
