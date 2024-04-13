// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EventService } from '../events/event.service';
import { RegistrationService } from '../registration/registration.service';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnChanges{

  currentProspect$ = this.registrationService.currentProspect$;
  currentEvent$ = this.eventService.currentEvent$;
  myEvents$ = this.eventService.myEvents$;
  eventType$ = this.registrationService.eventType$;

  showRegisterForm = false;
  registered = false;

  isRegistered$! : Observable<boolean>;;

  constructor(private eventService: EventService, private registrationService: RegistrationService) {
   }

  ngOnInit(): void {
    this.isRegistered$ = combineLatest([this.myEvents$, this.currentEvent$]).pipe(
      map(([myEvents, currentEvent]) => {
        return myEvents.some(event => event.id === currentEvent.id);
      })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES:', changes)
  }

  registerForEvent() {
    this.showRegisterForm = true;
  }

  setEventType(eventType: string) {
    this.registrationService.setEventType(eventType);
  }

  onSubmit() {
    // Do something
  }

}
