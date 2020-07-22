import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSocketComponent } from './chat-socket.component';

describe('ChatSocketComponent', () => {
  let component: ChatSocketComponent;
  let fixture: ComponentFixture<ChatSocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
