describe('Basic Demos', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('default mfk-input container should have 10 input fields', () => {
    cy.get('#default > uiowa-mfk-input > .mfk-container > .mfk-field').then(
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

  it('default mfk fields labels and inputs should be center', () => {
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > label'
    ).should('have.css', 'text-align', 'center');

    cy.get(
      ' #default > uiowa-mfk-input > .mfk-container > :nth-child(1) > input'
    ).should('have.css', 'text-align', 'center');
  });

  it('should display correct initial MFK strings for all basic demos', () => {
    cy.get('#mfk1-string > uiowa-mfk-string ').then((el) => {
      expect(el.length).to.be.equal(1);
      expect(el[0].innerText).to.be.equal('---------');
    });
    cy.get('#mfk2-string > uiowa-mfk-string ').then((el) => {
      expect(el.length).to.be.equal(1);
      expect(el[0].innerText).to.be.equal('-----xxxx----');
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
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).type('020-12-1012-01008-00000000-6219-000-00111-12-355545');
    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01008-00000000-6219-000-00111-12-3555');
  });

  it('default MFK input -- typing numbers should auto jump to next field -- 2', () => {
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).type('020-12-1012');
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(4) > .form-control'
    ).should('be.focused');
    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-------');

    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(3) > .form-control'
    ).type('{backspace}');
    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-101-------');
  });

  it('default MFK input -- typing tabs should auto fill 0s and move to next field', () => {
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    )
      .click()
      .tab();
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).should('have.value', '000');
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(2) > .form-control'
    )
      .should('be.focused')
      .tab()
      .tab()
      .tab()
      .tab();
    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '000-00-0000-00000-00000000-----');
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(6) > .form-control'
    )
      .should('be.focused')
      .tab()
      .tab()
      .tab()
      .tab()
      .tab();
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(10) > .form-control'
    ).should('have.value', '0000');
    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '000-00-0000-00000-00000000-0000-000-00000-00-0000');

    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).should('be.focused'); // this is a field in the next demo; the cursor jumps to it due to tabs.
  });

  it('default MFK input -- typing combination of numbers and tabs', () => {
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).type('216102015');
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(4) > .form-control'
    )
      .should('be.focused')
      .tab()
      .tab()
      .type('6128');
    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(7) > .form-control'
    )
      .should('be.focused')
      .tab()
      .tab()
      .tab()
      .tab();
    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '216-10-2015-00000-00000000-6128-000-00000-00-0000');
  });

  it('default MFK input -- paste a string - shorter than 40 characters', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '260-43-5064-40100-00000000-6026-520-20100-00-0');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).then((inputs) => {
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('260');
      // cy.get('#mfk1-string > uiowa-mfk-string')
      //   .invoke('text')
      //   .should('be.equal', '260---------'); // not able to verify in Cypress --> have to manually verify
    });

    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(5) > .form-control'
    ).then((inputs) => {
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('26043506');
      // cy.get('#mfk1-string > uiowa-mfk-string')
      //   .invoke('text')
      //   .should('be.equal', '260----26043506-----'); // not able to verify in Cypress --> have to manually verify
    });
  });

  it('default MFK input -- paste a string - 40 characters but with letters', () => {
    const dt = new DataTransfer();
    dt.setData(
      'text/plain',
      '260-43-5064-40100-00000000-6026-520-20100-00-0000'
    );
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).then((inputs) => {
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('260');
    });

    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6026-520-20100-00-0000');
  });

  it('default MFK input -- paste a string - 40 digits', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '2604350644010000000000602652020100000000');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).then((inputs) => {
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('260');
    });

    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6026-520-20100-00-0000');
  });

  it('default MFK input -- paste a string - 40 digits - then past another 40 digits', () => {
    const dt = new DataTransfer();

    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).then((inputs) => {
      dt.setData('text/plain', '2604350644010000000000602652020100000000');
      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: dt,
        bubbles: true,
        cancelable: true,
      });

      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('260');

      cy.get('#mfk1-string > uiowa-mfk-string')
        .invoke('text')
        .should(
          'be.equal',
          '260-43-5064-40100-00000000-6026-520-20100-00-0000'
        );
    });

    cy.get(
      '#default > uiowa-mfk-input > .mfk-container > :nth-child(6) > .form-control'
    ).then((inputs) => {
      dt.setData('text/plain', '2604350644010000000000602652020100000001');
      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: dt,
        bubbles: true,
        cancelable: true,
      });
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('6026');

      cy.get('#mfk1-string > uiowa-mfk-string')
        .invoke('text')
        .should(
          'be.equal',
          '260-43-5064-40100-00000000-6026-520-20100-00-0001'
        );
    });
  });

  it('MFK input with a readonly field -- initial state', () => {
    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(6) > .form-control'
    )
      .should('have.value', 'xxxx')
      .should('have.attr', 'readonly');
    cy.get('#mfk2-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '-----xxxx----');
  });

  it('MFK input with a readonly field -- typing numbers - should skip the readonly field', () => {
    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).type('2604350644010000000000');
    cy.get('#mfk2-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-xxxx----');
    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(7) > .form-control'
    )
      .should('be.focused')
      .type('520-20100-00-0000');
    cy.get('#mfk2-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-xxxx-520-20100-00-0000');
  });

  it('MFK input with a readonly field -- typing tabs - should focus the readonly field but not setting value', () => {
    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    )
      .click()
      .tab()
      .tab()
      .tab()
      .tab()
      .tab();
    cy.get('#mfk2-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '000-00-0000-00000-00000000-xxxx----');
    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(6) > .form-control'
    )
      .should('be.focused')
      .tab()
      .tab()
      .tab()
      .tab()
      .tab();
    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(10) > .form-control'
    ).should('have.value', '0000');
    cy.get('#mfk2-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '000-00-0000-00000-00000000-xxxx-000-00000-00-0000');

    cy.get(
      '#default-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).should('be.focused'); // this is a field in the next demo; the cursor jumps to it due to tabs.
  });

  it('MFK input with a readonly field -- paste a string - 40 digits', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '2604350644010000000000602652020100000000');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get(
      '#readonly-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).then((inputs) => {
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('260');
      cy.get('#mfk2-string > uiowa-mfk-string')
        .invoke('text')
        .should(
          'be.equal',
          '260-43-5064-40100-00000000-xxxx-520-20100-00-0000'
        );
    });
  });

  it('MFK input with a default value field -- initial state', () => {
    cy.get(
      '#default-field > uiowa-mfk-input > .mfk-container > :nth-child(6) > .form-control'
    )
      .should('have.value', '6128')
      .should('not.have.attr', 'readonly');
    cy.get('#mfk3-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '-----6128----');
  });

  it('MFK input with a default value field -- typing', () => {
    cy.get(
      '#default-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).type('2604350644010000000000');
    cy.get('#mfk3-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6128----');
    cy.get(
      '#default-field > uiowa-mfk-input > .mfk-container > :nth-child(6) > .form-control'
    )
      .should('be.focused')
      .type('5520-20100-00-0000');
    cy.get('#mfk3-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6128-520-20100-00-0000');
  });

  it('MFK input with a default value field -- typing can change the default value', () => {
    cy.get(
      '#default-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).type('2604350644010000000000{backspace}');
    cy.get('#mfk3-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-612----');
    cy.get(
      '#default-field > uiowa-mfk-input > .mfk-container > :nth-child(6) > .form-control'
    )
      .should('be.focused')
      .type('5520-20100-00-0000');
    cy.get('#mfk3-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6125-520-20100-00-0000');
  });

  it('MFK input with a default value field -- paste a string - 40 digits', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '2604350644010000000000602652020100000000');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get(
      '#default-field > uiowa-mfk-input > .mfk-container > :nth-child(1) > .form-control'
    ).then((inputs) => {
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('260');
      cy.get('#mfk3-string > uiowa-mfk-string')
        .invoke('text')
        .should(
          'be.equal',
          '260-43-5064-40100-00000000-6026-520-20100-00-0000'
        );
    });
  });
});
