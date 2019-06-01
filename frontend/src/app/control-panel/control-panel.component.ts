import {Component, OnInit} from '@angular/core';
import {ApiService} from "../core/api.service";
import {COMMAND_GENERATE_STATIC_HTML} from "../shared/util";
import {ProgressBarService} from "../core/progress-bar.service";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private apiService: ApiService, private progressBarService: ProgressBarService) {
  }

  ngOnInit() {
  }

  execute() {
    this.progressBarService.show(true);
    this.apiService.execute(COMMAND_GENERATE_STATIC_HTML).subscribe(res => {
      this.progressBarService.show(false);
    })
  }
}
