import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseFinished, User} from '../user';
import {isNumber} from 'util';
import {TransporterService} from '../transporter.service';
import {MongoDBService} from '../mongo-db.service';

@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.css']
})
export class ExerciseViewComponent implements OnInit {
  @ViewChild('Form') formValues;

  user: User;
  trainingIndex: number;
  exerciseIndex: number;
  countLeft: number;
  exerciseFinished = new ExerciseFinished();

  constructor(private transport: TransporterService,
              private mongoDB: MongoDBService) { }

  ngOnInit() {
    if (isNumber(+sessionStorage.getItem('training'))) {
      this.trainingIndex = +sessionStorage.getItem(('training'));
    }
    if (isNumber(+sessionStorage.getItem('exercise'))) {
      this.exerciseIndex = +sessionStorage.getItem(('exercise'));
    }
    if (this.transport.getUser()) {
      this.user = this.transport.getUser();
      this.countLeft = this.transport.getUser().userTraining[this.trainingIndex].userExercises[this.exerciseIndex].count;
    }
    if (this.user === undefined) {
      this.mongoDB.getUserById(sessionStorage.getItem('user')).subscribe((userGet: User) => {
        this.user = userGet;
        this.countLeft = userGet.userTraining[this.trainingIndex].userExercises[this.exerciseIndex].count;
        console.log('User by id was find!');
      });
    } else {
      sessionStorage.setItem('user', this.user._id.toString() );
      console.log('user was add to sessionStorage');
    }
  }

  exerciseDone(param1: number, param2: number) {
    this.formValues.resetForm();
    if (param2 && param1) {
      console.log(`param1: ${param1}  param2: ${param2}`);
      this.exerciseFinished.add(param1, param2);
      this.countLeft = this.countLeft - 1;
      if (this.countLeft === 0) {
        this.user.userTraining[this.trainingIndex].userExercises[this.exerciseIndex].exerciseFinished.push(this.exerciseFinished);
        this.mongoDB.updateUsers(this.user);
      }
    }
  }

}
