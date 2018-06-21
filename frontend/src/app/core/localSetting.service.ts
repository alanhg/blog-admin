/**
 * 本地存储化服务类
 */
export class LocalSettingService {

  static setLoginStatus(value: boolean) {
    localStorage.setItem("loggedIn", String(value));
  }

  static getLoginStatus() {
    return (localStorage.getItem("loggedIn")) == "true";
  }

  static clearLoginStatus() {
    localStorage.removeItem("loggedIn");
  }
}
