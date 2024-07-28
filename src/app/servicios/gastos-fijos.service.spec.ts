import { TestBed } from '@angular/core/testing';

import { GastosFijosService } from './gastos-fijos.service';

describe('GastosFijosService', () => {
  let service: GastosFijosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastosFijosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
