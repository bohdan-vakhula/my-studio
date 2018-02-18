import { TestBed, inject } from '@angular/core/testing';

import { MsComponentService } from './ms-component.service';

describe('MsComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsComponentService]
    });
  });

  it('should be created', inject([MsComponentService], (service: MsComponentService) => {
    expect(service).toBeTruthy();
  }));
});
