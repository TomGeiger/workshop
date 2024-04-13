import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Prospect, RegistrationService } from './registration.service';
import { of, switchMap, take } from 'rxjs';
import { EventService, MyEvent } from '../events/event.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  registrationForm!: FormGroup;
  error: string = '';

  eventType$ = this.registrationService.eventType$;
  currentEvent$ = this.eventService.currentEvent$;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService, private eventService: EventService) {
    const prospect = this.getProspect();
    this.initializeForm(prospect);
    // console.log('CONSTRUCTING RegistrationComponent:', prospect);
    // this.registrationService.getProspect();
  }

  getProspect() {
    const prospect = this.registrationService.getProspect();
    if (prospect) {
      // this.currentProspect = prospect;
      this.registrationService.setCurrentProspect(prospect);
      return prospect;
    }
    return null;
  }

  initializeForm(prospect: Prospect | null) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      referrer: ['', Validators.required],
      // discountCode: [''],
    });

    if (prospect) {
      prospect.referrer = '';
      this.registrationForm.patchValue(prospect);
    }

  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const prospect = this.registrationForm.value;

      this.registrationService.saveProspectToLocalStorage(prospect);
      this.registrationService.setCurrentProspect(prospect);

      // You can call the registration service here to send the data to the server

      
      // add event to prospect
      this.currentEvent$.pipe(
        take(1),
        switchMap(event => {
          const myEvent = event as MyEvent;
          myEvent.referrer = prospect.referrer;

          this.eventService.addEventToMyEvents(myEvent);
          return of(this.eventService.saveMyEventToLocalStorage(myEvent));

        })).subscribe(() => {
          prospect.referrer = '';
          this.registrationForm.patchValue(prospect);
          this.error = '';
    
        });

    } else {
      console.log('Please fill out all required fields.');
      this.error = 'Please fill out all required fields.';
    }
  }


}
