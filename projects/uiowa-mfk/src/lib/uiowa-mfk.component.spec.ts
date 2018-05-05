import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiowaMfkComponent } from './uiowa-mfk.component';

describe('UiowaMfkComponent', () => {
  let component: UiowaMfkComponent;
  let fixture: ComponentFixture<UiowaMfkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiowaMfkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiowaMfkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
