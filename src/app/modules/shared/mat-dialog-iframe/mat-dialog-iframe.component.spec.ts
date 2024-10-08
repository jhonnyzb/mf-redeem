import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogIframeComponent } from './mat-dialog-iframe.component';

describe('MatDialogIframeComponent', () => {
  let component: MatDialogIframeComponent;
  let fixture: ComponentFixture<MatDialogIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogIframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
