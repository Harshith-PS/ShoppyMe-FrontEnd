import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseDetailsComponent } from './view-purchase-details.component';

describe('ViewPurchaseDetailsComponent', () => {
  let component: ViewPurchaseDetailsComponent;
  let fixture: ComponentFixture<ViewPurchaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
