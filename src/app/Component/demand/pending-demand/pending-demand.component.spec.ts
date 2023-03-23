import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDemandComponent } from './pending-demand.component';

describe('PendingDemandComponent', () => {
  let component: PendingDemandComponent;
  let fixture: ComponentFixture<PendingDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
