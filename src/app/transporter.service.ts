import { Injectable } from '@angular/core';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

  private user: User;

  constructor() { }

  setUser(user) {
    this.clearUser();
    this.user = user;
  }

  getUser() {
    const temp = this.user;
    return temp;
  }

  clearUser() {
    this.user = undefined;
  }
}
