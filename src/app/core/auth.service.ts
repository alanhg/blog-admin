/**
 * 认证服务类
 */
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor() {

  }

}
