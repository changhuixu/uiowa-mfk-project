describe('Advanced Demos', () => {
  beforeEach(() => {
    cy.visit('actions');
  });

  it('should preserve the readonly field in an MFK input', () => {
    cy.get('button#update-value1-btn').click();

    cy.get(
      '#update-mfk-value > uiowa-mfk-input > #mfk-container > :nth-child(6) > .form-control'
    )
      .should('have.value', 'xxxx')
      .should('have.attr', 'readonly');

    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-xxxx-000-00111-12-3555');
  });

  it('should allow to set options', () => {
    cy.get('#checkbox-readonly').click();
    cy.get('#checkbox-brf').click();
    cy.get('#set-option2-btn').click();

    cy.get('pre').then(($el) => {
      const json = JSON.parse($el[0].textContent || '');
      expect(json.length).to.be.equal(2);
      expect(json[0].name).to.be.equal('iact');
      expect(json[0].defaultValue).to.be.equal('6218');
      expect(json[0].readonly).to.be.equal(true);
      expect(json[1].name).to.be.equal('brf');
      expect(json[1].defaultValue).to.be.equal('');
    });
    cy.get('#mfk2-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '-----6218----');

    cy.get(
      '#configurable-options > uiowa-mfk-input > #mfk-container > :nth-child(6) > .form-control'
    )
      .should('have.value', '6218')
      .should('have.attr', 'readonly');

    cy.get(
      '#configurable-options > uiowa-mfk-input > #mfk-container  .form-control'
    ).then(($el) => {
      expect($el.length).to.be.equal(11);
    });
  });

  it('should update existing MFK after set options', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '0201210120100100000000621900000111123555');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get(
      '#configurable-options > uiowa-mfk-input > #mfk-container > :nth-child(2) > .form-control'
    ).then((inputs) => {
      expect(inputs.length).to.be.equal(1);
      inputs[0].dispatchEvent(pasteEvent);
    });
    cy.get(
      '#configurable-options > uiowa-mfk-input > #mfk-container > :nth-child(6) > .form-control'
    ).should('have.value', '6219');

    cy.get('#set-option2-btn').click();

    cy.get('pre').then(($el) => {
      const json = JSON.parse($el[0].textContent || '');
      expect(json.length).to.be.equal(1);
      expect(json[0].name).to.be.equal('iact');
      expect(json[0].defaultValue).to.be.equal('6218');
      expect(json[0].readonly).to.be.equal(false);
    });
    cy.get('#mfk2-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6218-000-00111-12-3555');

    cy.get(
      '#configurable-options > uiowa-mfk-input > #mfk-container > :nth-child(6) > .form-control'
    )
      .should('have.value', '6218')
      .should('not.have.attr', 'readonly');
  });
});
