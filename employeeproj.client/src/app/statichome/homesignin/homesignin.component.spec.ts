import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesigninComponent } from './homesignin.component';

describe('HomesigninComponent', () => {
  let component: HomesigninComponent;
  let fixture: ComponentFixture<HomesigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomesigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomesigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
