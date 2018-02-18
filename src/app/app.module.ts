import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolboxPanelComponent } from './components/toolbox-panel/toolbox-panel.component';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { MsDraggableDirective } from './directives/ms-draggable.directive';
import { MsCompoComponent } from './components/ms-compo/ms-compo.component';
import { MsCompHostDirective } from './directives/ms-comp-host.directive';
import { MsComponentService } from './services/ms-component.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolboxPanelComponent,
    CanvasPanelComponent,
    MsDraggableDirective,
    MsCompoComponent,
    MsCompHostDirective,
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [ MsCompoComponent ],
  providers: [MsComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
