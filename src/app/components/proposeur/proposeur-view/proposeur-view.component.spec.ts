import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeurViewComponent } from './proposeur-view.component';

describe('ProposeurViewComponent', () => {
  let component: ProposeurViewComponent;
  let fixture: ComponentFixture<ProposeurViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposeurViewComponent],
    });
    fixture = TestBed.createComponent(ProposeurViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
