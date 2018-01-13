import { TestBed, inject } from '@angular/core/testing';

import { TumblrApiService } from './tumblr-api.service';

describe('TumblrApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TumblrApiService]
    });
  });

  it('should be created', inject([TumblrApiService], (service: TumblrApiService) => {
    expect(service).toBeTruthy();
  }));
});
