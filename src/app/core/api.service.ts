import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

/**
 *
 */
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }


  login() {
    return this.http.post("/mock-data/user-login-mock.json", {});
  }

  logout() {

  }

  getPosts() {
    return this.http.get("/mock-data/posts-mock.json");
  }

  getPost() {
    return this.http.get("/mock-data/post-mock.json");
  }


  addPost() {
    return this.http.post("/mock-data/posts-mock.json", {});
  }

  deploy() {

  }
}
