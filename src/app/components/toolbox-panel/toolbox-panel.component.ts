import { Component, OnInit } from '@angular/core';
import { Endpoint } from '../../models/endpoint';
import { Scope } from '../../models/scope';
import { ENDPOINTS, SCOPES } from '../../appconfig';

@Component({
  selector: 'app-toolbox-panel',
  templateUrl: './toolbox-panel.component.html',
  styleUrls: ['./toolbox-panel.component.scss']
})
export class ToolboxPanelComponent implements OnInit {
  endpoints: Endpoint[] = ENDPOINTS;
  scopes: Scope[] = SCOPES;
  shouldShowEndpoints = false;
  shouldShowScopes = false;
  selectedTool = null;

  constructor() { }

  ngOnInit() {
  }

  toggleEndpoints() {
    this.shouldShowEndpoints = !this.shouldShowEndpoints;
  }

  toggleScopes() {
    this.shouldShowScopes = !this.shouldShowScopes;
  }

  selectTool(tool:any) {
    this.selectedTool = tool;
  }
}
