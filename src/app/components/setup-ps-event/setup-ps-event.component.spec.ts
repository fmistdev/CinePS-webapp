import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPsEventComponent } from './setup-ps-event.component';

describe('SetupPsEventComponent', () => {
  let component: SetupPsEventComponent;
  let fixture: ComponentFixture<SetupPsEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupPsEventComponent]
    });
    fixture = TestBed.createComponent(SetupPsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
