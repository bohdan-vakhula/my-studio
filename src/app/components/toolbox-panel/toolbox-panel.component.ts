import { Component, OnInit } from '@angular/core';
import { MsComponentData } from '../../models/ms-component-data';
import { MsComponentService } from '../../services/ms-component.service';

@Component({
  selector: 'app-toolbox-panel',
  templateUrl: './toolbox-panel.component.html',
  styleUrls: ['./toolbox-panel.component.scss']
})
export class ToolboxPanelComponent implements OnInit {
  shouldShowEndpoints = false;
  shouldShowScopes = false;
  endpoints: MsComponentData[] = [];
  scopes: MsComponentData[] = [];

  constructor(public msComponentService: MsComponentService) {
    this.endpoints = msComponentService.getEndpoints();
    this.scopes = msComponentService.getScopes();
  }

  ngOnInit() {
  }

  toggleEndpoints() {
    this.shouldShowEndpoints = !this.shouldShowEndpoints;
  }

  toggleScopes() {
    this.shouldShowScopes = !this.shouldShowScopes;
  }
}
