import {IPost} from './post';
import * as moment from 'moment';
import {BLOG_URL} from './constants';

export enum ExecuteCommands {
  deploy = 'deploy',
  updateBlogSource = 'updateBlogSource',
  generateStaticHtml = 'generateStaticHtml'
}

export const parseMDContent = (content: string): IPost => {
  let pattern = '(?<=abbrlink: )[0-9a-z]+';
  let match = content.match(pattern);
  let post: IPost = {
    date: null,
    year: null,
    month: null,
    day: null,
    title: '',
    content: ''
  };
  if (match !== null) {
    post.abbrlink = match[0];
  }

  pattern = '(?<=date: ).+(?=\\n)';
  match = content.match(pattern);
  if (match !== null) {
    let momentDate = moment(match[0]);
    post.date = match[0];
    post.year = momentDate.year();
    post.month = momentDate.month() + 1;
    post.day = momentDate.date();
  }
  return post;
};

export const getPostLink = (post: IPost): string | null =>
  post.abbrlink ? `${BLOG_URL}/${post.year}/${post.month.toString().padStart(2, '0')}/${post.day.toString().padStart(2, '0')}/${post.abbrlink}/` : null;
