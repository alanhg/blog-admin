import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

declare let showdown: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  renderedCnt: string;
  sourceCnt: string;
  converter = new showdown.Converter();
  title: string;
  updating: Subscription;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get("id");
    this.apiService.getPost(this.title).subscribe(res => {
      this.sourceCnt = res["content"];
      this.updateView();
    });
  }


  publish() {
    if (window.confirm("确认发布")) {
      this.apiService.deploy().subscribe(res => {
        alert("已发布");
        this.router.navigateByUrl("/posts");
      })
    }
  }

  updateView() {
    this.renderedCnt = this.converter.makeHtml(this.sourceCnt);
    this.updating = this.apiService.updatePost(this.title, this.sourceCnt).subscribe(res => {
    });
  }

  ngOnDestroy() {
  }


}
