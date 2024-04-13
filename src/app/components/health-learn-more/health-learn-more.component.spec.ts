import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthLearnMoreComponent } from './health-learn-more.component';

describe('HealthLearnMoreComponent', () => {
  let component: HealthLearnMoreComponent;
  let fixture: ComponentFixture<HealthLearnMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthLearnMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthLearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
