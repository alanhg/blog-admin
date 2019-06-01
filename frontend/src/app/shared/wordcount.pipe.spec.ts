import {WordcountPipe} from './wordcount.pipe';
// @ts-ignore
import {describe, expect, it} from 'jasmine';

describe('WordcountPipe', () => {
  it('create an instance', () => {
    const pipe = new WordcountPipe();
    expect(pipe).toBeTruthy();
  });
});
