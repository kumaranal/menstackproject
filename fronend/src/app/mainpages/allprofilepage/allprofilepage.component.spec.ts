import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprofilepageComponent } from './allprofilepage.component';

describe('AllprofilepageComponent', () => {
  let component: AllprofilepageComponent;
  let fixture: ComponentFixture<AllprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllprofilepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
