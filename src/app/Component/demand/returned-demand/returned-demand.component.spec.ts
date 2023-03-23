import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedDemandComponent } from './returned-demand.component';

describe('ReturnedDemandComponent', () => {
  let component: ReturnedDemandComponent;
  let fixture: ComponentFixture<ReturnedDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnedDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnedDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
