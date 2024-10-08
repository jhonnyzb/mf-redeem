import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAddressDialogComponent } from './mat-address-dialog.component';

describe('MatAddressDialogComponent', () => {
  let component: MatAddressDialogComponent;
  let fixture: ComponentFixture<MatAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatAddressDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
