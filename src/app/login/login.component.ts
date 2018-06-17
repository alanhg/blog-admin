import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";

/**
 *
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }


  doSubmit() {
    this.apiService.login().subscribe(res => {
      this.authService.isLoggedIn = true;
      this.router.navigateByUrl("/posts");
    })
  }
}
