import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitAppComponent } from './init-app.component';

describe('InitAppComponent', () => {
  let component: InitAppComponent;
  let fixture: ComponentFixture<InitAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitAppComponent]
    });
    fixture = TestBed.createComponent(InitAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
