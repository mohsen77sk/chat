import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAlertComponent } from './alert.component';

describe('ChatAlertComponent', () => {
  let component: ChatAlertComponent;
  let fixture: ComponentFixture<ChatAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatAlertComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
