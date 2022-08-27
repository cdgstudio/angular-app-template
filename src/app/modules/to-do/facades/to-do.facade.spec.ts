import { TestBed } from '@angular/core/testing';

import { ToDoFacade } from './to-do.facade';

describe('ToDoFacade', () => {
  let service: ToDoFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
