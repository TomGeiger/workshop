import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthLearnMoreComponent } from './wealth-learn-more.component';

describe('WealthLearnMoreComponent', () => {
  let component: WealthLearnMoreComponent;
  let fixture: ComponentFixture<WealthLearnMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WealthLearnMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WealthLearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
