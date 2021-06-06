/* eslint-disable no-undef */
describe('PDF view', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/v1/login', { fixture: 'login.json' })
      .as('loginRequest');
    cy.intercept('GET', '/api/v1/tickets', { fixture: 'tickets.json' })
      .as('getTicketsRequest');
    cy.visit('/');
    cy.typeLogin('test', 'test1234');
    cy.get('[data-cy=btn]').click();
    cy.wait(['@loginRequest', '@getTicketsRequest']);
    cy.get('[data-cy=UploaderSection-select]').click();
  });

  it('Pdf view render correctly', () => {
    cy.get('[data-cy=pdf-title]').should('be.visible');
    cy.get('[data-cy=pdf-loader]').should('be.visible');
  });

  it('Upload pdf badly', () => {
    const file = '../fixtures/file.json';
    const fileName = 'file.json';
    cy.fixture(file).then((fileContent) => {
      cy.get('input[name="file"]').upload({
        fileContent,
        fileName,
        mimeType: 'application/json',
      });
    });
    cy.get('[data-cy=btn-pdf-loader]').click();
    cy.get('.notify .error').should('be.visible');
  });

  it('Should upload a pdf correctly', () => {
    const file = '../fixtures/file.json';
    const fileName = 'file.json';
    cy.intercept('POST', '/api/v1/tickets', { fixture: 'file.json' })
      .as('filePdf');
    cy.fixture(file).then((fileContent) => {
      cy.get('input[name="file"]').upload({
        fileContent,
        fileName,
        mimeType: 'application/json',
      });
    });
    cy.get('[data-cy=file-name]').should('be.visible');
    cy.get('[data-cy=btn-pdf-loader]').click();
    cy.wait('@filePdf');
    cy.get('.notify .success').should('be.visible');
    cy.get('[data-cy=select-pdf]').should('be.visible');
  });
});
