import { Component, OnInit } from '@angular/core';
import { User} from '../user';
import { MongoDBService} from '../mongo-db.service';
import {TransporterService} from '../transporter.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  users: User[];

  constructor(private service: MongoDBService,
              private transport: TransporterService) { }

  ngOnInit() {
    this.service.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log('Done');
    });
  }

  transportUser(user: User) {
    this.transport.setUser(user);
  }

}
