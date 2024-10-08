import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixPaymentComponent } from './mix-payment.component';

describe('MixPaymentComponent', () => {
  let component: MixPaymentComponent;
  let fixture: ComponentFixture<MixPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
