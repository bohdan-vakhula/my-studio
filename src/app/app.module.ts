import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolboxPanelComponent } from './components/toolbox-panel/toolbox-panel.component';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolboxPanelComponent,
    CanvasPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
