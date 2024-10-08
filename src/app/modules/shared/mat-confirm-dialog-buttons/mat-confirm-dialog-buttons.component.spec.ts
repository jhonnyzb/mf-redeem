import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogButtonsComponent } from './mat-confirm-dialog-buttons.component';

describe('MatConfirmDialogButtonsComponent', () => {
  let component: MatConfirmDialogButtonsComponent;
  let fixture: ComponentFixture<MatConfirmDialogButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatConfirmDialogButtonsComponent]
    });
    fixture = TestBed.createComponent(MatConfirmDialogButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
