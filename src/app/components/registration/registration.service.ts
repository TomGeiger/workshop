import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventService, WorkshopEvent } from '../events/event.service';

export interface Prospect {
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  phone: string;
  referrer: string;
  events?: WorkshopEvent[];
  // eventType: string; // Health, Wealth
}


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private eventTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  eventType$ = this.eventTypeSubject.asObservable();

  private currentProspectSubject: Subject<Prospect> = new Subject<Prospect>();
  currentProspect$ = this.currentProspectSubject.asObservable();

  // currentEvent$ = this.eventService.currentEvent$;

  constructor(private eventService: EventService) { }

  setEventType(eventType: string) {
    this.eventTypeSubject.next(eventType);
  }

  setCurrentProspect(prospect: Prospect) {
    this.currentProspectSubject.next(prospect);
    // this.saveProspectToLocalStorage(prospect);
  }

  clearCurrentProspect() {
    this.currentProspectSubject.next({ name: '', email: '', phone: '', referrer: '' });
  }

  clearEventType() {
    this.eventTypeSubject.next('');
  }

  // save prospect to local storage
  saveProspectToLocalStorage(prospect: Prospect) {
    // prospect.referrer = '';
    localStorage.setItem('prospect', JSON.stringify(prospect));
  }

  // get prospect from local storage
  getProspect(): Prospect {
    const prospect = localStorage.getItem('prospect');
    if (prospect) {
      this.setCurrentProspect(JSON.parse(prospect));
    }
    return prospect ? JSON.parse(prospect) : { name: '', email: '', phone: '', referrer: '', events: []};
  }



}
