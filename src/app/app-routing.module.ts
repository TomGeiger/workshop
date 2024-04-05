import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkshopComponent } from './workshop/workshop.component';

const routes: Routes = [
  // add default home route
  { path: 'home', component: HomeComponent },
  { path: 'workshop', component: WorkshopComponent},
  { path: '', redirectTo: '/workshop', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
