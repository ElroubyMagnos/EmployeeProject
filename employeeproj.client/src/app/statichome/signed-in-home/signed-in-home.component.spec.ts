import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInHomeComponent } from './signed-in-home.component';

describe('SignedInHomeComponent', () => {
  let component: SignedInHomeComponent;
  let fixture: ComponentFixture<SignedInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignedInHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignedInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
