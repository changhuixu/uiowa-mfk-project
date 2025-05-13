describe('Split Cost Demos', () => {
  beforeEach(() => {
    cy.visit('#/split-cost');
  });

  it('should allow save two MFKs', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '0201210120100100000000621900000111123555');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#mfk-lines :nth-child(1) > .mfk-container input').then((inputs) => {
      expect(inputs.length).to.be.equal(10);
      inputs[0].dispatchEvent(pasteEvent);
    });

    cy.get('#saveBtn').click();
    cy.get('.modal-dialog').should('exist');

    cy.get('#results > pre').then(($el) => {
      const json = JSON.parse($el[0].textContent || '');
      expect(json.length).to.be.equal(1);
      console.log(json[0]);
      expect(json[0].id).to.be.equal(0);
      expect(json[0].percentage).to.be.equal(100);
      expect(json[0].mfk.fund).to.be.equal('020');
      expect(json[0].mfk.org).to.be.equal('12');
      expect(json[0].mfk.dept).to.be.equal('1012');
    });

    cy.get('#confirmBtn').click();
    cy.get('.modal-dialog').should('not.exist');
  });
});
