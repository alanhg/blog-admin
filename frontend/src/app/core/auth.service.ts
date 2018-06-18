/**
 * 认证服务类
 */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
  loggedIn: Subject<boolean>;
  redirectUrl: string;

  constructor() {
    this.loggedIn = new Subject();
  }

}
