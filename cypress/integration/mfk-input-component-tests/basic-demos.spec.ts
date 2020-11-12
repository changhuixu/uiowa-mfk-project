describe('Basic Demos', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('default mfk-input container should have 10 input fields', () => {
    cy.get('#default > uiowa-mfk-input > #mfk-container > .mfk-field').then(
      (inputs) => {
        expect(inputs.length).to.be.equal(10);
        expect(inputs[0].innerText).to.be.equal('Fund');
        expect(inputs[1].innerText).to.be.equal('Org');
        expect(inputs[2].innerText).to.be.equal('Dept');
        expect(inputs[3].innerText).to.be.equal('Subdept');
        expect(inputs[4].innerText).to.be.equal('Grant/Pgm');
        expect(inputs[5].innerText).to.be.equal('Iact');
        expect(inputs[6].innerText).to.be.equal('Oact');
        expect(inputs[7].innerText).to.be.equal('Dact');
        expect(inputs[8].innerText).to.be.equal('Fn');
        expect(inputs[9].innerText).to.be.equal('Cctr');
      }
    );
  });

  it('should display correct initial MFK strings for all basic demos', () => {
    cy.get('#mfk1-string > uiowa-mfk-string ').then((el) => {
      expect(el.length).to.be.equal(1);
      expect(el[0].innerText).to.be.equal('');
    });
    cy.get('#mfk2-string > uiowa-mfk-string ').then((el) => {
      expect(el.length).to.be.equal(1);
      expect(el[0].innerText).to.be.equal('');
    });
    cy.get<HTMLElement[]>('#mfk3-string > uiowa-mfk-string > span > span').then(
      (spans) => {
        expect(spans.length).to.be.equal(10);
        var result = '';
        for (let i = 0; i < 10; i++) {
          result += spans[i].innerText;
        }
        // const result = spans.map((x) => x.innerText).join(''); // this way does not work..
        expect(result).to.be.equal('-----6128----');
      }
    );
  });

  it('default MFK input -- typing numbers should auto jump to next field', () => {
    
  });

  it('default MFK input -- typing tabs should auto fill 0s and move to next field', () => {});

  it('default MFK input -- typing combination of numbers and tabs', () => {});

  it('default MFK input -- paste a string - shorter than 40 characters', () => {});

  it('default MFK input -- paste a string - 40 characters but with letters', () => {});

  it('default MFK input -- paste a string - 40 digits', () => {});

  it('default MFK input -- paste a string - 40 digits - then past another 40 digits', () => {});

  it('MFK input with a readonly field -- initial state', () => {});

  it('MFK input with a readonly field -- typing numbers - should skip the readonly field', () => {});

  it('MFK input with a readonly field -- typing tabs - should skip the readonly field', () => {});

  it('MFK input with a readonly field -- paste a string - 40 digits', () => {});

  it('MFK input with a default value field -- initial state', () => {});

  it('MFK input with a default value field -- typing', () => {});

  it('MFK input with a default value field -- typing can change the default value', () => {});

  it('MFK input with a default value field -- paste a string - 40 digits', () => {});
});
