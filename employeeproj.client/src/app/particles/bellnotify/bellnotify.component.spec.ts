import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellnotifyComponent } from './bellnotify.component';

describe('BellnotifyComponent', () => {
  let component: BellnotifyComponent;
  let fixture: ComponentFixture<BellnotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BellnotifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BellnotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
