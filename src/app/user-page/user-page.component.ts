import { Component, OnInit } from '@angular/core';
import {MongoDBService} from '../mongo-db.service';
import {TransporterService} from '../transporter.service';
import {Training, User} from '../user';



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private transport: TransporterService,
              private mongoDB: MongoDBService) { }

  user: User;

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
  }

  addTraining(trainingName) {
    const training = new Training(trainingName);
    this.user.userTraining.push(training);
    this.mongoDB.updateUsers(this.user);
  }
  delete(training) {
    if (confirm('Are you sure to delete this training')) {
      const index = this.user.userTraining.indexOf(training);
      this.user.userTraining.splice(index, 1);
      this.mongoDB.updateUsers(this.user);
    }
  }
  choice(training: Training) {
    sessionStorage.setItem('training', this.user.userTraining.indexOf(training).toString());
  }
}
