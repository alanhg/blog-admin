import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {ExecuteCommands} from "../shared/util";
import {ProgressBarService} from "../core/progress-bar.service";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  updateBlogSource = ExecuteCommands.updateBlogSource;
  publishPost = ExecuteCommands.publishPost;

  constructor(private apiService: ApiService, private progressBarService: ProgressBarService) {
  }

  ngOnInit() {
  }

  execute(command: ExecuteCommands) {
    this.progressBarService.show(true);
    this.apiService.execute(command).subscribe(res => {
      this.progressBarService.show(false);
    })
  }
}
