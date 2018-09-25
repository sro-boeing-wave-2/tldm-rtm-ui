import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService, LocalStorageService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
