/**
 * 认证服务类
 */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
  loggedIn$ = new Subject<boolean>();
  loggedIn = false;
  redirectUrl: string;

  constructor() {
  }

  updateStatus(logggedIn: boolean) {
    this.loggedIn$.next(logggedIn);
    this.loggedIn = logggedIn;
  }

}
