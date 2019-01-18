import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent} from './user-page/user-page.component';
import { UserStatisticsComponent} from './user-statistics/user-statistics.component';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
  { path: 'gym/userPage/:id', component: UserPageComponent},
  { path: '', redirectTo: '/gym', pathMatch: 'full'},
  { path: 'gym/userStatistics', component: UserStatisticsComponent},
  { path: 'gym', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
