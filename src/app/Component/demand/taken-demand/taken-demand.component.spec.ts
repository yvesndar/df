import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenDemandComponent } from './taken-demand.component';

describe('TakenDemandComponent', () => {
  let component: TakenDemandComponent;
  let fixture: ComponentFixture<TakenDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakenDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakenDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
