import { Component, OnInit } from '@angular/core';
import { MsComponentService } from '../../services/ms-component.service';

@Component({
  selector: 'app-property-box',
  templateUrl: './property-box.component.html',
  styleUrls: ['./property-box.component.scss']
})
export class PropertyBoxComponent implements OnInit {

  constructor(public msComponentService: MsComponentService) { }

  ngOnInit() {
  }

}
