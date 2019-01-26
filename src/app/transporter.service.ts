import {Injectable} from '@angular/core';
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
    return this.user;
  }

  clearUser() {
    this.user = undefined;
  }
}
