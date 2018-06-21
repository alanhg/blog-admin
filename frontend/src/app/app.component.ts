import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "./core/api.service";
import {AuthService} from "./core/auth.service";
import {ProgressBarService} from "./core/progress-bar.service";
import {LocalSettingService} from "./core/localSetting.service";

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
    this.progressBarService.isHiden.subscribe(res => this.hideProgress = res);
    showdown.setFlavor('github');
    showdown.setOption('openLinksInNewWindow', true);

    this.authService.loggedIn$.subscribe(res => {
      this.loggedIn = res;
    });

    this.authService.updateStatus(LocalSettingService.getLoginStatus());
  }


  logout() {
    this.apiService.logout().subscribe(() => {
      this.authService.updateStatus(false);
      LocalSettingService.setLoginStatus(false);
      this.router.navigateByUrl("/login");
    });
  }
}
