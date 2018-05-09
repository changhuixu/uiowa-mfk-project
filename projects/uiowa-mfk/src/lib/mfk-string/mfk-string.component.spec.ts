import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MfkStringComponent } from './mfk-string.component';
import { Mfk } from '../models/mfk';

describe('MfkStringComponent', () => {
  let component: MfkStringComponent;
  let fixture: ComponentFixture<MfkStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MfkStringComponent]
    });
    fixture = TestBed.createComponent(MfkStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.mfk = new Mfk('0201210120100100000000621900000111123555');
    fixture.detectChanges();
    expect(component).toBeDefined();

    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.textContent).toContain(
      '020-12-1012-01001-00000000-6219-000-00111-12-3555'
    );
  });

  it('should update text content when MFK changes field value', () => {
    const mfk = new Mfk('0201210120100100000000621900000111123555');
    component.mfk = mfk;
    fixture.detectChanges();
    expect(component.mfk.IACT).toBe('6219');
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.textContent).toContain(
      '020-12-1012-01001-00000000-6219-000-00111-12-3555'
    );

    mfk.IACT = '6200';
    fixture.detectChanges();
    expect(el.textContent).toContain(
      '020-12-1012-01001-00000000-6200-000-00111-12-3555'
    );
  });
});
