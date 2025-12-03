const validResponse: string = `1
Valid MFK
{GRANT=Not Assigned, FUND=Stores Srvcs Revolving Dpt Svc, ORG=Information Technology Service, DEPT=ITS Admin Information Systems, IACT=Travel Out State Fac and Staff, COSTCENTER=Not Assigned, FUNCTION=Not Assigned}
`;
const invalidResponse: string = `0
Invalid MFK - FUND DOES NOT EXIST
{GRANT=Not Assigned, FUND=Not Found, ORG=Tippie College of Business, DEPT=Not Found, IACT=Not Found, COSTCENTER=Hamilton Dennis, FUNCTION=Not Found}
`;

describe('MFK Validations', () => {
  beforeEach(() => {
    cy.visit('#/mfk-validations');
  });

  it('should response valid for a valid MFK', () => {
    cy.get('button#set-value-btn').click();

    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '260-43-5064-40100-00000000-6026-520-20100-00-0000');

    cy.intercept(
      {
        method: 'GET',
        url: 'https://apps.its.uiowa.edu/mfk/**',
      },
      validResponse
    ).as('validation');

    cy.get('button#validate-btn').click();
    cy.wait('@validation');

    cy.get('pre').then(($el) => {
      const json = $el[0].textContent || '';
      expect(JSON.parse(json).statusCode).to.be.equal(1);
      expect(JSON.parse(json).statusMessage).to.be.equal('Valid MFK');
    });
  });

  it('should response invalid for an invalid MFK', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '0201210120100100000000621900000111123555');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get(':nth-child(2) > input').then((inputs) => {
      expect(inputs.length).to.be.equal(1);
      inputs[0].dispatchEvent(pasteEvent);
      expect(inputs[0]).to.have.value('02');
    });

    cy.get('#mfk1-string > uiowa-mfk-string')
      .invoke('text')
      .should('be.equal', '020-12-1012-01001-00000000-6219-000-00111-12-3555');

    cy.intercept(
      {
        method: 'GET',
        url: 'https://apps.its.uiowa.edu/mfk/**',
      },
      invalidResponse
    ).as('validation');
    cy.get('button#validate-btn').click();
    cy.wait('@validation');

    cy.get('pre').then(($el) => {
      const json = $el[0].textContent || '';
      expect(JSON.parse(json).statusCode).to.be.equal(0);
      expect(JSON.parse(json).statusMessage).to.be.equal('Invalid MFK - FUND DOES NOT EXIST');
    });
  });
});
