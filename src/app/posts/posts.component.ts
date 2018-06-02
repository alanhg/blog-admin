import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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

  posts: Array<any> = [];
  postHtml: SafeHtml;
  converter = new showdown.Converter();

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.apiService.getPosts().subscribe(res => {
      this.posts = res["data"];
    })
  }

  searchPost() {

  }

  postClick() {
    this.apiService.getPost().subscribe(res => {
      this.postHtml = this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(res["data"]))
    })
  }
}
