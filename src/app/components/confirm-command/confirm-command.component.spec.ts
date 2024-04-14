import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCommandComponent } from './confirm-command.component';

describe('ConfirmCommandComponent', () => {
  let component: ConfirmCommandComponent;
  let fixture: ComponentFixture<ConfirmCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
