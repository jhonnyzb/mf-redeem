import { TestBed } from '@angular/core/testing';

import { DivipolaService } from './divipola.service';

describe('DivipolaService', () => {
  let service: DivipolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivipolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
