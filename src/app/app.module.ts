import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { ToolboxPanelComponent } from './components/toolbox-panel/toolbox-panel.component';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { MsDraggableDirective } from './directives/ms-draggable.directive';
import { MsCompoComponent } from './components/ms-compo/ms-compo.component';
import { MsCompHostDirective } from './directives/ms-comp-host.directive';
import { MsComponentService } from './services/ms-component.service';
import { ConnectionService } from './services/connection.service';
import { PropertyBoxComponent } from './components/property-box/property-box.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConnectionLineComponent } from './components/connection-line/connection-line.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolboxPanelComponent,
    CanvasPanelComponent,
    MsDraggableDirective,
    MsCompoComponent,
    MsCompHostDirective,
    PropertyBoxComponent,
    ConnectionLineComponent,
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    FormsModule,
    AngularDraggableModule
  ],
  entryComponents: [ MsCompoComponent ],
  providers: [
    MsComponentService,
    ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
