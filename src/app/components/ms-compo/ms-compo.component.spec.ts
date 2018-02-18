import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsCompoComponent } from './ms-compo.component';

describe('MsCompoComponent', () => {
  let component: MsCompoComponent;
  let fixture: ComponentFixture<MsCompoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsCompoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
