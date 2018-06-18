import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "./core/api.service";
import {AuthService} from "./core/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.authService.loggedIn.subscribe(res => {
      this.loggedIn = res;
    });
    this.getLogin();
  }


  getLogin() {
    this.apiService.getLogin().subscribe((res: any) => {
      this.authService.loggedIn.next(res.loggedIn);
      if (res.loggedIn) {
        this.router.navigate(["/posts"]);
      }
      else {
        this.router.navigate(["/login"]);
      }
    })
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      this.authService.loggedIn.next(false);
      this.router.navigateByUrl("/login");
    });
  }
}