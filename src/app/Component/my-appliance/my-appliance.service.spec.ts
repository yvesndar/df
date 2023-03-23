import { TestBed } from '@angular/core/testing';

import { MyApplianceService } from './my-appliance.service';

describe('MyApplianceService', () => {
  let service: MyApplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyApplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
