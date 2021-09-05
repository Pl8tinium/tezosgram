import { TestBed } from '@angular/core/testing';
import { ChainInteractionService } from './chainInteraction.service';


describe('chainInteractionService', () => {
  let service: ChainInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
