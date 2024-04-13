import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeRemaining'
})
export class TimeRemainingPipe implements PipeTransform {
  transform(date: string, time: string): string {
    // Combine date and time into a single string
    const dateTimeString = `${date} ${time}`;

    // Parse the combined date and time string using Moment.js
    const eventDateTime = moment(dateTimeString, 'YYYY-MM-DD hh:mm A');

    // Calculate the time remaining until the meeting starts
    const timeRemaining = eventDateTime.fromNow();

    return timeRemaining;
  }
}

@Pipe({
  name: 'isWithinTenMinutes'
})
export class IsWithinTenMinutesPipe implements PipeTransform {
  transform(eventDateTime: Date): boolean {
    const tenMinutesFromNow = moment().add(10, 'minutes');
    const eventTime = moment(eventDateTime);

    return eventTime.isBetween(moment(), tenMinutesFromNow);
  }
}
