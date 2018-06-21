import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../core/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ProgressBarService} from "../core/progress-bar.service";
import {ModalDirective} from "ngx-bootstrap";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/combineLatest';
import * as showdownHighlight from "showdown-highlight";

declare let showdown: any;

/**
 * 双屏显示博客原文及渲染后页面
 *
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  renderedCnt = "";
  converter = new showdown.Converter({
    // That's it
    extensions: [showdownHighlight]
  });
  updating: Subscription;
  @ViewChild("successModal") successModal: ModalDirective;

  title: string;
  sourceCnt: string;

  title$ = new Subject<string>();
  sourceCnt$ = new Subject<string>();

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private progressBarService: ProgressBarService) {
    this.sourceCnt$.debounceTime(400).subscribe(res => {
      this.savePost();
    })
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get("id");
    this.apiService.getPost(this.title).subscribe(res => {
      this.sourceCnt = res["content"];
      this.updateView();
    });
  }

  /**
   * 发布
   */
  publish() {
    this.progressBarService.show(true);
    this.apiService.deploy().subscribe(res => {
      this.progressBarService.show(false);
      this.successModal.show();
    })
  }

  /**
   * 更新成功提示确认
   */
  confirm() {
    this.successModal.hide();
  }

  /**
   * 更新渲染
   */
  updateView() {
    this.sourceCnt$.next(this.sourceCnt);
    this.renderedCnt = this.converter.makeHtml(this.sourceCnt);
  }

  /**
   * 保存文章
   */
  savePost() {
    this.updating = this.apiService.updatePost(this.title, this.sourceCnt).subscribe(res => {
      this.router.navigate(["/posts/", this.title]);
    });
  }

  ngOnDestroy() {
  }

}
