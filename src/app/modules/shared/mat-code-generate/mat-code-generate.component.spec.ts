import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCodeGenerateComponent } from './mat-code-generate.component';

describe('MatCodeGenerateComponent', () => {
  let component: MatCodeGenerateComponent;
  let fixture: ComponentFixture<MatCodeGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCodeGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCodeGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
