import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "./core/api.service";
import {AuthService} from "./core/auth.service";
import {ProgressBarService} from "./core/progress-bar.service";

declare let showdown: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn;
  hideProgress: boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private authService: AuthService,
              private progressBarService: ProgressBarService
  ) {
    this.authService.loggedIn.subscribe(res => {
      this.loggedIn = res;
    });
    this.getLogin();
    this.progressBarService.isHiden.subscribe(res => this.hideProgress = res);
    showdown.setFlavor('github');
    showdown.setOption('openLinksInNewWindow', true);
  }


  getLogin() {
    this.apiService.getLogin().subscribe((res: any) => {
      this.authService.loggedIn.next(res.loggedIn);
    })
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      this.authService.loggedIn.next(false);
      this.router.navigateByUrl("/login");
    });
  }
}
