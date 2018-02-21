import { Component, OnInit, Input } from '@angular/core';
import { MsComponentService } from '../../services/ms-component.service';
import { MsCompoComponent } from '../../components/ms-compo/ms-compo.component';

@Component({
  selector: 'app-property-box',
  templateUrl: './property-box.component.html',
  styleUrls: ['./property-box.component.scss']
})
export class PropertyBoxComponent implements OnInit {
  @Input() msComponentUID;
  msCompoComponent: MsCompoComponent;

  constructor(public msComponentService: MsComponentService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.msCompoComponent = this.msComponentService.getMsCompComponent(this.msComponentUID);
  }

}
