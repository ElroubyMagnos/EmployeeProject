import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferingComponent } from './buffering.component';

describe('BufferingComponent', () => {
  let component: BufferingComponent;
  let fixture: ComponentFixture<BufferingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BufferingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BufferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
