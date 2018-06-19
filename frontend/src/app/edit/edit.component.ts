import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../core/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ProgressBarService} from "../core/progress-bar.service";
import {ModalDirective} from "ngx-bootstrap";

declare let showdown: any;

/**
 * 双屏显示博客原文及渲染后页面
 */
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
  @ViewChild("successModal") successModal: ModalDirective;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private progressBarService: ProgressBarService) {

  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get("id");
    this.apiService.getPost(this.title).subscribe(res => {
      this.sourceCnt = res["content"];
      this.updateView();
    });
  }


  publish() {
    this.progressBarService.show(true);
    this.apiService.deploy().subscribe(res => {
      this.progressBarService.show(false);
      this.successModal.show();
    })
  }

  confirm() {
    this.successModal.hide();
    this.router.navigateByUrl("/posts");
  }


  updateView() {
    this.renderedCnt = this.converter.makeHtml(this.sourceCnt);
    this.updating = this.apiService.updatePost(this.title, this.sourceCnt).subscribe(res => {
    });
  }

  ngOnDestroy() {
  }

}
