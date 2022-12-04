import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyConversationComponent } from './empty-conversation.component';

describe('EmptyConversationComponent', () => {
  let component: EmptyConversationComponent;
  let fixture: ComponentFixture<EmptyConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyConversationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
