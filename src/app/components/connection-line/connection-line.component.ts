import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { MsPosition } from '../../models/ms-position';

@Component({
  selector: 'app-connection-line',
  templateUrl: './connection-line.component.html',
  styleUrls: ['./connection-line.component.scss']
})
export class ConnectionLineComponent implements OnInit {
  @Input() startPosition: MsPosition;
  @Input() endPosition: MsPosition;

  constructor(public connectionService: ConnectionService) { }

  ngOnInit() {
  }
}
