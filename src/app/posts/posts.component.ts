import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Router} from "@angular/router";

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

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit() {
    this.apiService.getPosts().subscribe(res => {
      this.posts = res["posts"];
    })
  }

  searchPost(keyword: string) {

  }

  postClick(title: string) {
    this.apiService.getPost(title).subscribe(res => {
      this.postHtml = this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(res["content"]))
    })
  }


  postEdit(title: string) {
    this.router.navigateByUrl(`/posts/${title}`);
  }
}
