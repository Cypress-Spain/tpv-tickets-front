describe('Main view', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/v1/login', { fixture: 'login.json' })
      .as('loginRequest');
    cy.intercept('GET', '/api/v1/tickets', { fixture: 'tickets.json' })
      .as('getTicketsRequest');
    cy.visit('/');
    cy.typeLogin('test', 'test1234');
    cy.get('[data-cy=btn]').click();
    cy.wait(['@loginRequest', '@getTicketsRequest']);
  });

  it('Main view should content the navbar', () => {
    cy.get('nav').should('be.visible');
    cy.contains('nav', 'TPV APP');
  });

  it(`The table should have a total of ${3} pdfs`, () => {
    cy.get('.table-container').should('have.length', 3);
    cy.get('[data-cy=price-info]').should('have.length', 3);
  });

  it('Testing the headers of the table', () => {
    const TOTAL_COLUMNS = 4;
    cy.get('.tickets-container .container .header').first().click({ force: true });
    cy.get('.content > table thead tr').children().should('have.length', TOTAL_COLUMNS);
    cy.get('table > thead > tr').within(() => {
      cy.get('th').eq(0).contains('Date');
      cy.get('th').eq(1).contains('Price');
    });
  });

  it('Input date validations', () => {
    cy.get('[data-cy=main-date-input]').type('08/08/2020');
    cy.get('.error').should('be.visible');
    cy.get('[data-cy=main-date-input]').clear().type('08-32-2020');
    cy.get('.error').should('be.visible');
  });

  it('Input price validations', () => {
    cy.get('[data-cy=main-price-input]').clear().type('1234');
    cy.get('.error').should('be.visible');
    cy.get('[data-cy=main-price-input]').clear().type('1.23');
    cy.get('.error').should('be.visible');
    cy.get('[data-cy=main-price-input]').clear().type('12,23234');
    cy.get('.error').should('be.visible');
    cy.get('[data-cy=main-price-input]').clear().type('41,2');
    cy.get('.error').should('be.visible');
  });

  it('Should register a ticket and update the validation', () => {
    cy.intercept('POST', '/api/v1/tickets/register', { body: { success: true } })
      .as('regsterTicket');
    cy.intercept('GET', '/api/v1/tickets', { fixture: 'ticketsAfterRegister.json' })
      .as('getTicketsRequest');
    cy.get('[data-cy=main-date-input]').type('08-08-2020');
    cy.get('[data-cy=main-price-input]').type('2,12{enter}');
    cy.wait(['@regsterTicket', '@getTicketsRequest']);
  });

  it('Should show a modal and delete a ticket', () => {
    const TOTAL_ROWS = 4;
    cy.intercept('DELETE', '/api/v1/tickets/30', { fixture: 'deletedTicket.json' })
      .as('deletedTicket');
    cy.contains('Tickets sin pdf').click({ force: true });
    cy.get('table > tbody > tr').should('have.length', TOTAL_ROWS);
    cy.get('[data-cy=deleteBtn-30]').click();
    cy.get('.deleteBtn').click();
    cy.wait('@deletedTicket');
    cy.get('.notify .success').should('be.visible');
    cy.contains('Tickets sin pdf').click({ force: true });
    cy.get('table > tbody > tr').should('have.length', TOTAL_ROWS - 1);
  });

  it('Should show a modal and delete a ticket badly', () => {
    cy.intercept('DELETE', '/api/v1/tickets/1', { fixture: 'deletedTicket.json' })
      .as('deletedTicket');
    cy.contains('Tickets sin pdf').click({ force: true });
    cy.get('[data-cy=deleteBtn-31]').click();
    cy.get('.deleteBtn').click();
    cy.get('.error').should('be.visible');
  });

  it('Should upload a photo correctly', () => {
    const file = '../fixtures/file.json';
    const fileName = 'file.json';
    cy.intercept('POST', '/api/v1/ticket/ocr', { fixture: 'uploadedPhoto.json' })
      .as('uploadedPhoto');
    cy.fixture(file).then((fileContent) => {
      cy.get('.file').upload({
        fileContent,
        fileName,
        mimeType: 'application/json',
      });
    });
    cy.get('[data-cy=main-date-input]').should('have.value', '12-12-2020');
    cy.get('[data-cy=main-price-input]').should('have.value', '19,00');
  });
});
