import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../core/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {ProgressBarService} from '../core/progress-bar.service';
import {ModalDirective} from 'ngx-bootstrap';

import * as showdownHighlight from 'showdown-highlight';
import {debounceTime} from 'rxjs/operators';

declare let showdown: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  renderedCnt = '';
  converter = new showdown.Converter({
    extensions: [showdownHighlight]
  });
  updating: Subscription;
  @ViewChild('successModal') successModal: ModalDirective;
  @ViewChild('confirmModal') confirmModal: ModalDirective;
  title: string;
  sourceCnt: string;

  title$ = new Subject<string>();
  sourceCnt$ = new Subject<string>();

  @ViewChild('rendered') rendered: ElementRef;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private progressBarService: ProgressBarService) {
    this.sourceCnt$.pipe(debounceTime(400)).subscribe(res => {
      this.savePost();
    });
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id');
    this.apiService.getPost(this.title).subscribe(res => {
      this.sourceCnt = res['content'];
      this.updateView();
    });
  }


  publish() {
    this.progressBarService.show(true);
    this.apiService.deploy().subscribe(res => {
      this.progressBarService.show(false);
      this.confirmModal.hide();
      this.successModal.show();
    });
  }

  confirm() {
    this.successModal.hide();
  }


  updateView() {
    this.sourceCnt$.next(this.sourceCnt);
    this.renderedCnt = this.converter.makeHtml(this.sourceCnt);
  }

  savePost() {
    this.updating = this.apiService.updatePost(this.title, this.sourceCnt).subscribe(res => {
      this.router.navigate(['/posts/', this.title]);
    });
  }

  editorScrolled(event) {
    this.rendered.nativeElement.scrollTop = event.target.scrollTop;
  }


  ngOnDestroy() {
  }

}
