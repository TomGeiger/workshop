import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeQuizComponent } from './life-quiz.component';

describe('LifeQuizComponent', () => {
  let component: LifeQuizComponent;
  let fixture: ComponentFixture<LifeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LifeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
