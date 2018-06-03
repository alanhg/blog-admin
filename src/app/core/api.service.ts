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

  getPosts(q?: string) {
    let url = "/api/posts";
    if (q) {
      url += `?q=${q}`;
    }
    return this.http.get(url);
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

  addPost(title: string) {
    return this.http.post("/api/posts", {title: title});
  }

  deploy() {

  }
}
