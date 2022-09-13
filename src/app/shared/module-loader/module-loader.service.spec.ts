import { TestBed } from '@angular/core/testing';

import { ModuleLoaderService } from './module-loader.service';

describe('ModuleLoaderService', () => {
  let service: ModuleLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
