import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-connection-line',
  templateUrl: './connection-line.component.html',
  styleUrls: ['./connection-line.component.scss']
})
export class ConnectionLineComponent implements OnInit {
  @Input() x1: number;
  @Input() y1: number;
  @Input() x2: number;
  @Input() y2: number;

  constructor() { }

  ngOnInit() {
  }

}
