describe('Favorite MFK Demos', () => {
  beforeEach(() => {
    cy.visit('#/favorite-mfk');
  });

  it('should display active star when the input MFK is in favorite', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '0201210120100100000000621900000111123555');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#favorite-mfk-group :nth-child(2) > input').then((inputs) => {
      expect(inputs.length).to.be.equal(1);
      inputs[0].dispatchEvent(pasteEvent);
    });

    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6219-000-00111-12-3555');
    cy.get('[type="button"] svg').should('have.class', 'active');

    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :last').click();

    cy.get('[type="button"] svg').should('not.have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '---------');
  });

  it('should correctly select a favorite MFK from the dropdown list', () => {
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :first').should('contain.text', 'Test').click();

    cy.get('[type="button"] svg').should('have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6219-000-00111-12-3555');
    cy.get('#favorite-mfk-group :nth-child(6) > input').should(
      'have.value',
      '6219'
    );
    cy.get('#favorite-mfk-group :nth-child(10) > input').should(
      'have.value',
      '3555'
    );

    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :last').click();

    cy.get('[type="button"] svg').should('not.have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '---------');
  });

  it('should correctly add an MFK to the favorite MFKs list', () => {
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

    cy.get('#favorite-mfk-group :nth-child(2) > input').then((inputs) => {
      expect(inputs.length).to.be.equal(1);
      inputs[0].dispatchEvent(pasteEvent);
    });

    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6026-520-20100-00-0000');
    cy.get('[type="button"] svg').should('not.have.class', 'active');

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('My MFK');
      cy.get('[type="button"] svg').click();
    });

    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :nth-child(2)').should('contain.text', 'My MFK');
    cy.get('[type="button"] svg').should('have.class', 'active');

    cy.get('.dropdown-menu > :first').should('contain.text', 'Test').click();

    cy.get('[type="button"] svg').should('have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6219-000-00111-12-3555');

    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :nth-child(2)')
      .should('contain.text', 'My MFK')
      .click();

    cy.get('[type="button"] svg').should('have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6026-520-20100-00-0000');
  });

  it('should correctly toggle active/inactive state', () => {
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :first').should('contain.text', 'Test').click();

    cy.get('[type="button"] svg').should('have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6219-000-00111-12-3555');

    cy.get(':nth-child(3) > input').type('{backspace}');
    cy.get('[type="button"] svg').should('not.have.class', 'active');
    cy.get(':nth-child(3) > input').type('2');
    cy.get('[type="button"] svg').should('have.class', 'active');

    cy.get(':nth-child(3) > input').type('{backspace}2');
    cy.get('[type="button"] svg').should('have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6219-000-00111-12-3555');

    cy.get(':nth-child(4) > input').type('{backspace}8');
    cy.get('[type="button"] svg').should('not.have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01008-00000000-6219-000-00111-12-3555');
  });

  it('should correctly remove a favorite MFK', () => {
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :first').should('contain.text', 'Test').click();

    cy.get('[type="button"] svg').should('have.class', 'active');
    cy.get('#mfk-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6219-000-00111-12-3555');

    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Are you sure to remove this MFK?');
    });
    cy.get('[type="button"] svg').click();

    cy.get('[type="button"] svg').should('not.have.class', 'active');
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu li').should(($li) => {
      expect($li).to.have.length(2);
    });
  });
});
