import { Component, OnInit } from '@angular/core';
import { Instructor, InstructorService } from './instructor.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.scss'
})
export class InstructorsComponent implements OnInit{

  instructors$ = this.instructorService.instructors$;

  constructor(private instructorService: InstructorService) { }

  ngOnInit(): void {
    this.instructorService.getInstructors().subscribe();
  }

  setCurrentInstructor(instructor: Instructor) {
    this.instructorService.setCurrentInstructor(instructor);
  }

}
