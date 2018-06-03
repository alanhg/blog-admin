import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {ActivatedRoute} from "@angular/router";

declare let showdown: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  renderedCnt: string;
  sourceCnt: string;
  converter = new showdown.Converter();
  title: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get("id");
    this.apiService.getPost(this.title).subscribe(res => {
      this.sourceCnt = res["content"];
    })
  }


  publish() {

  }

  updateView(event) {
    this.renderedCnt = this.converter.makeHtml(event.target.value);
  }

}
