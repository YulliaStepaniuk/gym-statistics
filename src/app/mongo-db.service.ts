import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {

  url = 'http://localhost:4000/gym';

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get(`${this.url}`);
  }

  getUserById(id) {
    return this.http.get(`${this.url}/findById/${id}`);
  }
}
