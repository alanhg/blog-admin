/**
 * 本地存储化服务类
 */
export class LocalSettingService {

  static setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  static getToken(): string {
    return localStorage.getItem("token");
  }
}
