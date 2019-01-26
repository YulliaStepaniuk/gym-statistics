import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { MainPageComponent } from './main-page/main-page.component';
import {MongoDBService} from './mongo-db.service';
import {HttpClientModule} from '@angular/common/http';
import {TransporterService} from './transporter.service';
import { UserExerciseComponent } from './user-exercise/user-exercise.component';
import { ExerciseViewComponent } from './exercise-view/exercise-view.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    UserStatisticsComponent,
    MainPageComponent,
    UserExerciseComponent,
    ExerciseViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MongoDBService,
    TransporterService],
  bootstrap: [AppComponent]
})
export class AppModule {}

