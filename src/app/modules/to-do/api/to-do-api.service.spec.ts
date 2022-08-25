import { TestBed } from '@angular/core/testing';

import { ToDoApiService } from './to-do-api.service';

describe('ToDoApiService', () => {
  let service: ToDoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
