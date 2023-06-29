import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterViewComponent } from './voter-view.component';

describe('VoterViewComponent', () => {
  let component: VoterViewComponent;
  let fixture: ComponentFixture<VoterViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterViewComponent]
    });
    fixture = TestBed.createComponent(VoterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
