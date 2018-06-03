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


  delPost(title: string) {
    return this.http.delete(`/api/posts/${title}`);
  }

  updatePost(title: string, content: string) {
    return this.http.put(`/api/posts`, {
      title: title,
      content: content
    });
  }

  addPost() {
    return this.http.post("/mock-data/posts-mock.json", {});
  }

  deploy() {

  }
}
