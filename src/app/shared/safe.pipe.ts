import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * 安全管道
 */
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: string, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
