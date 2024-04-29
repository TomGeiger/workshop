import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../components/registration/registration.service';
import { EventService } from '../components/events/event.service';
import { InstructorService } from '../components/instructors/instructor.service';

import anime from 'animejs';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss'
})
export class WorkshopComponent implements OnInit, AfterContentInit {

  title: string = 'Wealth';
  instructors$ = this.instructorService.instructors$;

  @ViewChild('introText') introText!: ElementRef;

  constructor(private registrationService: RegistrationService, private eventService: EventService, private instructorService: InstructorService) {
  }

  ngOnInit(): void {
    const myEvents = this.eventService.getMyEvents();
    this.eventService.setMyEvents(myEvents);
  }

  ngAfterContentInit(): void {
    this.animate();
  }


  animate() {

    let translateYValue = window.innerWidth >= 992 ? 100 : 250;

    anime({
      targets: '.title',
      translateY: [
        { value: translateYValue, duration: 10000 },  // 250 phone 100 laptop
        { value: 0, duration: 3000 }
      ],
      rotate: {
        value: '2turn',
        easing: 'easeInOutSine'
      },
      delay: function (el, i, l) {
        return i * 2000
      },
      direction: 'alternate',
      autoPlay: false,
      loop: true
    })

    var updates = 0;

    anime({
      targets: '.health-wealthx',
      translateX: 370,
      delay: 1000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutCirc',
      update: function (anim) {
        updates++;
      }
    });

    anime({
      targets: '.health-wealthx',
      translateX: 350,
      delay: function (el, i, l) {
        return i * 2000
      },
      direction: 'alternate',
      loop: true,
      easing: 'spring(1, 80, 10, 0)'
    })

    // HACK - set timeout to allow the view to render
    setTimeout(() => {
      this.wrapCharacters();
    }, 1000);

  }

  wrapCharacters() {

    if (this.introText) {
      const paragraph = this.introText.nativeElement;
      const text = paragraph.textContent;
      const characters: string[] = text.split('');

      // Wrap each character in a span element
      const modifiedText = characters.map((char: string) => `<span>${char}</span>`).join('');

      // Replace the paragraph's content with the modified text
      paragraph.innerHTML = modifiedText;
      console.log('paragraph', paragraph)
    } else {
      console.error('introText element is not available.');
    }

    var tl = anime.timeline({
      targets: '.intro-text span',
      delay: function (el, i) { return i * 30 },
      duration: 500,          // Can be inherited
      easing: 'easeOutExpo',  // Can be inherited
      direction: 'alternate', // Is not inherited
      loop: true              // Is not inherited
    });

    tl
      .add({
        opacity: .5,
      })

  }


  setEventType(eventType: string) {
    this.title = eventType;
    this.registrationService.setEventType(eventType);
  }


}
