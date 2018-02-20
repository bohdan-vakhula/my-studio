import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionLineComponent } from './connection-line.component';

describe('ConnectionLineComponent', () => {
  let component: ConnectionLineComponent;
  let fixture: ComponentFixture<ConnectionLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
