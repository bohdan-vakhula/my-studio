import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxPanelComponent } from './toolbox-panel.component';

describe('ToolboxPanelComponent', () => {
  let component: ToolboxPanelComponent;
  let fixture: ComponentFixture<ToolboxPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolboxPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
