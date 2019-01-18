import { Component, OnInit } from '@angular/core';
import {MongoDBService} from '../mongo-db.service';
import {TransporterService} from '../transporter.service';
import {User} from '../user';



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
    this.user.userTraining.push(trainingName);
  }

}
