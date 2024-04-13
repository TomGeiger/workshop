import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../components/registration/registration.service';
import { EventService } from '../components/events/event.service';
import { InstructorService } from '../components/instructors/instructor.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss'
})
export class WorkshopComponent implements OnInit{

  title: string = 'Wealth';
  instructors$ = this.instructorService.instructors$;

  constructor(private registrationService: RegistrationService, private eventService: EventService, private instructorService: InstructorService) {
  }

  ngOnInit(): void {
    const myEvents = this.eventService.getMyEvents();
    this.eventService.setMyEvents(myEvents);
  }

  setEventType(eventType: string) {
    this.title = eventType;
    this.registrationService.setEventType(eventType);
  }


}
