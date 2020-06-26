import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCatComponent } from './pro-cat.component';

describe('ProCatComponent', () => {
  let component: ProCatComponent;
  let fixture: ComponentFixture<ProCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
