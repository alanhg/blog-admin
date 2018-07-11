import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * 控制进度条隐显
 */
@Injectable()
export class ProgressBarService {

  isHiden: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  show(isShow: boolean) {
    this.isHiden.next(!isShow);
  }

}
