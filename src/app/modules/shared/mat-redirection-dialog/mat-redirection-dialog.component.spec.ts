import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRedirectionDialogComponent } from './mat-redirection-dialog.component';

describe('MatRedirectionDialogComponent', () => {
  let component: MatRedirectionDialogComponent;
  let fixture: ComponentFixture<MatRedirectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatRedirectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatRedirectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
