import {Pipe, PipeTransform} from '@angular/core';
import * as wordcount from 'wordcount';

/**
 * 这里的value是html源码所以进行下内容转化
 * 计算字符数需要考虑中英文和英文单词问题
 */
@Pipe({
  name: 'wordcount'
})
export class WordcountPipe implements PipeTransform {

  transform(value: string, args?: any): number {
    const divObj = document.createElement('div');
    divObj.innerHTML = value;
    value = divObj.textContent;
    return counter(value);
  }
}

function counter(content: string) {
  const cn = content.match(/[\u4E00-\u9FA5]/g) || [];
  const en = content.replace(/[\u4E00-\u9FA5]/g, '');
  return cn.length + wordcount(en);
}
