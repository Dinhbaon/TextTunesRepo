import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationResultsComponent } from './recommendation-results.component';

describe('RecommendationResultsComponent', () => {
  let component: RecommendationResultsComponent;
  let fixture: ComponentFixture<RecommendationResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationResultsComponent]
    });
    fixture = TestBed.createComponent(RecommendationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
