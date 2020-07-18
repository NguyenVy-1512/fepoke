import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerityComponent } from './verity.component';

describe('VerityComponent', () => {
  let component: VerityComponent;
  let fixture: ComponentFixture<VerityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
