import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";

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

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }


  publish() {
    this.apiService.getPost().subscribe(res => {
      this.sourceCnt = res["data"];
    })
  }

  updateView(event) {
    this.renderedCnt = this.converter.makeHtml(event.target.value);
  }

}
