import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MfkInputComponent } from './mfk-input.component';
import { UiowaMfkOptionsService } from '../services/uiowa-mfk-options.service';
import { Mfk } from '../models/mfk';
import { MfkFieldOption } from '../models/mfk-field-option';
import { MfkFieldName } from '../models/mfk-field-name';

describe('MfkInputComponent', () => {
  let component: MfkInputComponent;
  let fixture: ComponentFixture<MfkInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MfkInputComponent],
      providers: [
        {
          provide: UiowaMfkOptionsService,
          useValue: new UiowaMfkOptionsService()
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect((<any>component)._mfk).toBeDefined();
    expect(component).toBeDefined();
    expect((<any>component).optionsService.defaultOptions.length).toBe(10);
  });

  it('should assign value to MFK when user inputs', () => {
    // Arrange
    const hostElement = fixture.debugElement.nativeElement;
    const fundInput: HTMLInputElement = hostElement.querySelector(
      'input[name="FUND"]'
    );
    const orgInput: HTMLInputElement = hostElement.querySelector(
      'input[name="ORG"]'
    );
    spyOn(component.mfkChange, 'emit');
    const mfk = new Mfk();

    // Act 1
    fundInput.value = '260';
    fundInput.dispatchEvent(new Event('input'));
    orgInput.dispatchEvent(
      new KeyboardEvent('keyup', { key: '2', bubbles: true, cancelable: true })
    );
    orgInput.dispatchEvent(
      new KeyboardEvent('keyup', { key: '6', bubbles: true, cancelable: true })
    );
    orgInput.dispatchEvent(
      new KeyboardEvent('keyup', { key: '0', bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    // Assert 1
    expect((<any>component)._mfk.FUND).toBe('260');
    mfk.FUND = '260';
    expect((<any>component)._mfk).toEqual(mfk);
    expect(component.mfkChange.emit).toHaveBeenCalledWith(mfk);

    // Act 2
    orgInput.value = '50';
    orgInput.dispatchEvent(new Event('input'));
    orgInput.dispatchEvent(
      new KeyboardEvent('keyup', { key: '5', bubbles: true, cancelable: true })
    );
    orgInput.dispatchEvent(
      new KeyboardEvent('keyup', { key: '0', bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    // Assert 2
    expect((<any>component)._mfk.ORG).toBe('50');
    mfk.ORG = '50';
    expect((<any>component)._mfk).toEqual(mfk);
    expect(component.mfkChange.emit).toHaveBeenCalledWith(mfk);
  });

  xit('should parse the paste input value to MFK', () => {
    // Arrange
    const hostElement = fixture.debugElement.nativeElement;
    const fundInput: HTMLInputElement = hostElement.querySelector(
      'input[name="FUND"]'
    );
    const orgInput: HTMLInputElement = hostElement.querySelector(
      'input[name="ORG"]'
    );
    spyOn(component.mfkChange, 'emit');
    const mfk = new Mfk('2604350644010000000000602652020100000000');

    // Act
    document.execCommand(
      'copy',
      false,
      '2604350644010000000000602652020100000000'
    );
    const evt = new ClipboardEvent('paste');
    // evt.clipboardData.items.add('2604350644010000000000602652020100000000', 'text/plain');
    // const evt2 = new ClipboardEvent('paste', {
    //     dataType: 'text/plain',
    //     data: '2604350644010000000000602652020100000000'
    //     });
    //     debugger;
    // clipboardData.setData('text/plain', '2604350644010000000000602652020100000000');
    orgInput.dispatchEvent(
      evt
      // new ClipboardEvent('paste', {
      //   dataType: 'text/plain',
      //   data: '2604350644010000000000602652020100000000'
      // })
    );
    fixture.detectChanges();
    expect((<any>component)._mfk).toEqual(mfk);
    expect(component.mfkChange.emit).toHaveBeenCalledWith(mfk);
  });

  it('should set MFK field Default value if empty', () => {
    const mfk = new Mfk('2604350644010000000000602652020100000000');
    component.mfk = Mfk.cast(mfk);
    fixture.detectChanges();
    expect(component.mfk).toEqual(mfk);

    component.options = [new MfkFieldOption(MfkFieldName.DEPT, '5000')];
    fixture.detectChanges();
    expect(component.mfk).toEqual(mfk);

    const mfk2 = new Mfk();
    component.mfk = new Mfk();
    fixture.detectChanges();
    mfk2.DEPT = '5000';
    expect(component.mfk).toEqual(mfk2);

    component.mfk = mfk;
    fixture.detectChanges();
    expect(component.mfk).toEqual(mfk);
  });

  it('should always set MFK readonly field to Default value', () => {
    const mfk = new Mfk('2604350644010000000000602652020100000000');
    component.mfk = Mfk.cast(mfk);
    component.options = [new MfkFieldOption(MfkFieldName.DEPT, '5000', true)];
    fixture.detectChanges();
    expect(component.mfk).not.toEqual(mfk);
    mfk.DEPT = '5000';
    expect(component.mfk).toEqual(mfk);

    const mfk2 = new Mfk();
    component.mfk = Mfk.cast(mfk2);
    fixture.detectChanges();
    mfk2.DEPT = '5000';
    expect(component.mfk).toEqual(mfk2);
  });
});
