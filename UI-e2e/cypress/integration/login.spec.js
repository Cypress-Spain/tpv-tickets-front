describe('Login view', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/v1/login', { fixture: 'login.json' })
      .as('loginRequest');
    cy.visit('/');
  });

  it('Login view should have inputs for usarname, password and one button', () => {
    cy.contains('h2', 'TPV-APP');
    cy.get('[data-cy=btn]').should('be.visible');
  });

  it('Testing inputs', () => {
    const typedText = 'new user';
    cy.get('[data-cy=username]').type(typedText).should('have.value', typedText);
    cy.get('[data-cy=password]').type(typedText).should('have.value', typedText);
  });

  it('It should log in by entering a valid username and password', () => {
    cy.intercept('GET', '/api/v1/tickets', { fixture: 'tickets.json' })
      .as('getTicketsRequest');
    cy.typeLogin('test', 'test1234');
    cy.get('[data-cy=btn]').click();
    cy.wait(['@loginRequest', '@getTicketsRequest']);
    cy.url().should('not.contain', '/login');
  });
});
