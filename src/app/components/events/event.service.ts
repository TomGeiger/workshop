import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Instructor } from '../instructors/instructor.service';

export interface WorkshopEvent {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  zoomLink: string;
  password: string;
  location: string;
  image: string;
  category: string;  // 
  price: number;
  capacity: number;
  registered: number;
  status: string;
  organizer: string;
  organizerImage: string;
  instructors: Instructor[];
  instructor: string;
  instructorId: number;
  instructorImage: string;
}

export interface MyEvent extends WorkshopEvent {
  referrer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventUrl = 'assets/events.json';

  initialValue: WorkshopEvent = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    time: '',
    zoomLink: '',
    password: '',
    location: '',
    image: '',
    category: '',
    price: 0,
    capacity: 0,
    registered: 0,
    status: '',
    organizer: '',
    organizerImage: '',
    instructors: [],
    instructor: '',
    instructorId: 0,
    instructorImage: ''
  };

  private currentEventSubject: BehaviorSubject<WorkshopEvent> = new BehaviorSubject<WorkshopEvent>(this.initialValue);
  currentEvent$ = this.currentEventSubject.asObservable();


  private myEventsSubject: BehaviorSubject<WorkshopEvent[]> = new BehaviorSubject<WorkshopEvent[]>([]);
  myEvents$ = this.myEventsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getEvents(): Observable<WorkshopEvent[]> {
    return this.http.get<WorkshopEvent[]>(this.eventUrl).pipe(
      catchError(this.handleError)
    );
  }

  saveMyEventToLocalStorage(event: WorkshopEvent) {
    const myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
    // is event already in myEvents?
    const found = myEvents.find((e: WorkshopEvent) => e.id === event.id);
    if (found) {
      console.log('Event already in myEvents:', event);
      return;
    }
    myEvents.push(event);
    localStorage.setItem('myEvents', JSON.stringify(myEvents));
  }

  getMyEvents(): MyEvent[] {
    return JSON.parse(localStorage.getItem('myEvents') || '[]');
  }

  setMyEvents(events: WorkshopEvent[]) {
    this.myEventsSubject.next(events);
  }

  addEventToMyEvents(event: WorkshopEvent) {
    const myEvents = this.getMyEvents();
    myEvents.push(event);
    this.setMyEvents(myEvents);
  }

  setCurrentEvent(event: WorkshopEvent) {
    this.currentEventSubject.next(event);
  }

  getEventById(id: number): Observable<WorkshopEvent | undefined> {
    return this.getEvents().pipe(
      map(events => events.find(event => event.id === id))
    );
  }

  handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An error occurred while fetching events. Please try again later.');
  }

}