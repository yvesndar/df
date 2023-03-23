import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplianceComponent } from './my-appliance.component';

describe('MyApplianceComponent', () => {
  let component: MyApplianceComponent;
  let fixture: ComponentFixture<MyApplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyApplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
