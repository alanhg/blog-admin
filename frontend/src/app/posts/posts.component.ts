import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

declare let showdown: any;
declare let Mark: any;

/**
 * 博客列表页
 */
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Array<string> = [];
  postHtml: SafeHtml;
  converter = new showdown.Converter();
  createStatus = false;

  queryField$ = new Subject<string>();
  queryField = "";
  selectedPost: string;

  constructor(private apiService: ApiService,
              private sanitizer: DomSanitizer,
              private router: Router) {
    this.queryField$.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        this.queryField = term;
        return this.searchPost(term)
      })
      .subscribe((res: any) => {
        this.posts = res["posts"];
        this.performMark(this.queryField);
      })
  }

  ngOnInit() {
    this.apiService.getPosts().subscribe(res => {
      this.posts = res["posts"];
      if (this.posts.length > 0) {
        this.getPost(this.posts[0]);
      }
    })
  }

  /**
   * 执行高亮
   */
  performMark(keyword: string) {
    let markInstance = new Mark("#posts-list");
    markInstance.unmark();
    if (keyword) {
      markInstance.mark(keyword);
    }
  }

  searchPost(term: string) {
    if (term) {
      term = term.toLowerCase()
    }
    return this.apiService.getPosts(term);
  }


  postClick(event, title: string, i: number) {
    const targetElement = event.target;
    if (targetElement.tagName != "I") {
      this.getPost(title);
    }
    else if (targetElement.className.includes("fa-trash")) {
      this.postDelete(title, i);
    }
    else {
      this.postEdit(title);
    }
  }


  getPost(title: string) {
    this.selectedPost = title;
    this.apiService.getPost(title).subscribe(res => {
      this.postHtml = this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(res["content"]))
    })
  }


  postEdit(title: String) {
    this.router.navigateByUrl(`/posts/${title}`);
  }


  postDelete(title: string, index: number) {
    if (window.confirm("确认删除?")) {
      this.apiService.delPost(title).subscribe(res => {
        this.posts.splice(index, 1);
      })
    }
  }

  createPost(title: string) {
    if (title.trim() === "") {
      return
    }
    this.apiService.addPost(title).subscribe((res: any) => {
      this.posts.splice(0, 0, res["title"]);
      this.createStatus = false;
      this.getPost(res["title"]);
    })
  }

  clearQueryField() {
    this.queryField = "";
    this.queryField$.next(null);
  }

}
