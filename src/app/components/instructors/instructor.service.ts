import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

export interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  image: string;
  phone: string;
  email: string;
  calendly?: string;
  bio?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

const initialInstructor: Instructor = {
  id: 0,
  firstName: '',
  lastName: '',
  title: '',
  image: '',
  phone: '',
  email: ''
};

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private instructorUrl = 'assets/instructors.json';
  private instructorsSubject: BehaviorSubject<Instructor[]> = new BehaviorSubject<Instructor[]>([]);
  instructors$ = this.instructorsSubject.asObservable();

  private instructorSubject: BehaviorSubject<Instructor> = new BehaviorSubject<Instructor>(initialInstructor);
  currentInstructor$ = this.instructorSubject.asObservable();

  constructor(private http: HttpClient) { }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorUrl).pipe(
      tap(instructors => this.setInstructors(instructors)),
      catchError(this.handleError)
    );
  }

  setInstructors(instructors: Instructor[]): void {
    this.instructorsSubject.next(instructors);
  }

  setCurrentInstructor(instructor: Instructor): void {
    this.instructorSubject.next(instructor);
  }

  handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An error occurred while fetching Instructors. Please try again later.');
  }

}
