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

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.getLogin();
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      this.router.navigateByUrl("/login");
    });
  }

  getLogin() {
    this.apiService.getLogin().subscribe((res: any) => {
      if (res.loggedIn) {
        this.authService.isLoggedIn = true;
        this.router.navigate(["/posts"]);
      }
    })
  }
}
