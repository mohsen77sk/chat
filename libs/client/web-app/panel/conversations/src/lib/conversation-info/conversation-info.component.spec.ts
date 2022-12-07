import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationInfoComponent } from './conversation-info.component';

describe('ConversationInfoComponent', () => {
  let component: ConversationInfoComponent;
  let fixture: ComponentFixture<ConversationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
