import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExecuteCommands} from "../shared/util";

/**
 *
 */
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }


  login(user: any) {
    return this.http.post('/api/login', user);
  }


  getLogin() {
    return this.http.get('/api/login');
  }

  logout() {
    return this.http.get('/api/logout');
  }

  getPosts(q?: string) {
    let url = '/api/posts';
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
    return this.http.post('/api/posts', {title: title});
  }

  execute(command: ExecuteCommands) {
    return this.http.get('/api/execute', {params: {command: command.toString()}});
  }
}
