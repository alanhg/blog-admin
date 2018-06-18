import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 *
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;


  constructor(private apiService: ApiService,
              private authService: AuthService,
              private router: Router,
              private fb: FormBuilder
  ) {

    this.userForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });



  }

  ngOnInit() {
  }

  onSubmit() {
    this.apiService.login(this.userForm.value).subscribe((res) => {
        this.authService.loggedIn .next(true);
        this.router.navigate(["/posts"]);
      },
      () => {
        alert("登录信息不正确");
      }
    );
  }
}
