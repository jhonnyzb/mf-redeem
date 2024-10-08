import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormNequiDaviplataComponent } from './mat-form-nequi-daviplata.component';

describe('MatFormNequiDaviplataComponent', () => {
  let component: MatFormNequiDaviplataComponent;
  let fixture: ComponentFixture<MatFormNequiDaviplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatFormNequiDaviplataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormNequiDaviplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
