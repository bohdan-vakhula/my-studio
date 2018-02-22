import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsGroupComponent } from './ms-group.component';

describe('MsGroupComponent', () => {
  let component: MsGroupComponent;
  let fixture: ComponentFixture<MsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
