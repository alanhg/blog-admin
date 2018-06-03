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
    return this.http.get(`/api/posts`);
  }

  getPost(title: string) {
    return this.http.get(`/api/posts/${title}`);
  }


  addPost() {
    return this.http.post("/mock-data/posts-mock.json", {});
  }

  deploy() {

  }
}
