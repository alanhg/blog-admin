import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

declare let showdown: any;

/**
 * 博客列表页
 */
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Array<String> = [];
  postHtml: SafeHtml;
  converter = new showdown.Converter();
  createStatus = false;

  queryField$ = new Subject<string>();

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private router: Router) {
    this.queryField$.debounceTime(400).distinctUntilChanged().switchMap(term => this.searchPost(term)).subscribe(res => {
      this.posts = res["posts"];
    })
  }

  ngOnInit() {
    this.apiService.getPosts().subscribe(res => {
      this.posts = res["posts"];
    })
  }

  searchPost(term: string) {
    return this.apiService.getPosts(term);
  }


  postClick(event, title: string, i: number) {
    const targetElement = event.target;
    if (targetElement.tagName != "I") {
      this.apiService.getPost(title).subscribe(res => {
        this.postHtml = this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(res["content"]))
      })
    }
    else if (targetElement.className.includes("fa-trash")) {
      this.postDelete(title, i);
    }
    else {
      this.postEdit(title);
    }
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
    this.apiService.addPost(title).subscribe(res => {
      this.posts.splice(0, 0, res["title"]);
      this.createStatus = false;
      // this.postClick(res["title"]);
    })
  }
}
