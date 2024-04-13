import { Component } from '@angular/core';
import { InstructorService } from '../instructors/instructor.service';
import { EventService, WorkshopEvent } from '../events/event.service';
import { map, of, switchMap } from 'rxjs';
import moment from 'moment';

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
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrl: './instructor-detail.component.scss'
})
export class InstructorDetailComponent {

  currentInstructor$ = this.instructorService.currentInstructor$;
  allEvents$ = this.eventService.getEvents();

  instructorEvents$ = this.currentInstructor$.pipe(
    switchMap(instructor => {
      if (!instructor) {
        return of([]);
      } else {
        return this.allEvents$.pipe(
          map(events => events.filter(event => event.instructorId === instructor.id))
        );
      }
    }),
    map(filteredEvents => filterUpcomingEvents(filteredEvents)),
    map(filteredEvents => sortEventsByDate(filteredEvents))
  );

  constructor(private instructorService: InstructorService, private eventService: EventService) { }

  viewEventDetails(event: any) {
    console.log(event);
    this.eventService.setCurrentEvent(event);
  }

}
