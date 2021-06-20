describe('Render tabs', () => {
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

  it('Should render the main screen when the Main tab is clicked', () => {
    cy.get('[data-cy=TicketsSection-select]').click();
    cy.get('.main.content').should('be.visible');
  });

  it('should render the main PdfLoder when the Main tab is clicked', () => {
    cy.get('[data-cy=UploaderSection-select]').click({ force: true });
    cy.get('.load-pdf-container.content').should('be.visible');
  });

  it('Should be redirected to the login when you click on the exit tab', () => {
    cy.get('[data-cy=Exit-select]').click();
    cy.url().should('include', '/login');
    cy.getCookie('session_token').should('be.null');
  });
});
