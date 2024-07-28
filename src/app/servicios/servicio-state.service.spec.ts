import { TestBed } from '@angular/core/testing';

import { ServicioStateService } from './servicio-state.service';

describe('ServicioStateService', () => {
  let service: ServicioStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
