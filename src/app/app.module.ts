import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { LifeQuizComponent } from './components/life-quiz/life-quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { IsWithinTenMinutesPipe, TimeRemainingPipe } from './time-remaining.pipe';
import { HealthLearnMoreComponent } from './components/health-learn-more/health-learn-more.component';
import { WealthLearnMoreComponent } from './components/wealth-learn-more/wealth-learn-more.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { InstructorDetailComponent } from './components/instructor-detail/instructor-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkshopComponent,
    LifeQuizComponent,
    RegistrationComponent,
    EventsComponent,
    EventDetailComponent,
    TimeRemainingPipe,
    IsWithinTenMinutesPipe,
    HealthLearnMoreComponent,
    WealthLearnMoreComponent,
    InstructorsComponent,
    InstructorDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
