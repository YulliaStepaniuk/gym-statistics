import {Component, OnInit, ViewChild} from '@angular/core';
import {Exercise, User} from '../user';
import {TransporterService} from '../transporter.service';
import {MongoDBService} from '../mongo-db.service';
import {isNumber} from 'util';


@Component({
  selector: 'app-user-exercise',
  templateUrl: './user-exercise.component.html',
  styleUrls: ['./user-exercise.component.css']
})
export class UserExerciseComponent implements OnInit {
  @ViewChild('myForm') formValues;

  user: User;
  index: number;
  createMode = true;

  constructor(private transport: TransporterService,
              private mongoDB: MongoDBService) { }

  ngOnInit() {
    this.user = this.transport.getUser();
    if (this.user === undefined) {
      this.mongoDB.getUserById(sessionStorage.getItem('user')).subscribe((userGet: User) => {
        this.user = userGet;
        console.log('User by id was find!');
      });
    } else {
      sessionStorage.setItem('user', this.user._id.toString() );
      console.log('user was add to sessionStorage');
    }
    if (isNumber(+sessionStorage.getItem('training'))) {
      this.index = +sessionStorage.getItem(('training'));
    }
  }

    finish(exerciseName: string, param1: string, param2: string, count: number) {
     if (exerciseName && param1 && param2 && count) {
        const exercise = new Exercise(exerciseName, param1, param2, count);
        this.user.userTraining[this.index].userExercises.push(exercise);
        this.mongoDB.updateUsers(this.user);
        this.formValues.resetForm();
    }
     this.createMode = true;
     this.formValues.resetForm();
  }

  deleteExercise(exercise: Exercise) {
    const indexToDelete = this.user.userTraining[this.index].userExercises.indexOf(exercise);
    this.user.userTraining[this.index].userExercises.splice(indexToDelete, 1);
    this.mongoDB.updateUsers(this.user);
  }
  isCreateMode() {
    this.createMode = false;
  }
  choice(exercise: Exercise) {
    sessionStorage.setItem('exercise', this.user.userTraining[this.index].userExercises.indexOf(exercise).toString());
  }
}
