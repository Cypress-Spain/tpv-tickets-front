
describe('DCSL Talk demo examples', () => {
  it('Hello world', () => {
    cy.visit('http://localhost:8080');
    cy.visit('/');
  });

  describe('Cypress concepts examples', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Selectors', () => {
      cy.get('.login input');
      cy.get('.login input').eq(0);
      // cy.get('[data-cy=username]');
    });

    it('Key events', () => {
      const typedText = 'new user';
      cy.get('[data-cy=username]').type(typedText);
      cy.get('[data-cy=password]').type(typedText);
    });

    it('Assertions', () => {
      const typedText = 'new user';
      cy.get('[data-cy=username]').type(typedText).should('have.value', typedText);
      cy.get('[data-cy=password]').type(typedText).should('have.value', typedText);
    });


    it('Server mocking', () => {
      // cy.intercept('POST', '/api/v1/login')
      //   .as('loginRequest');
      // cy.intercept('GET', '/api/v1/tickets')
      //   .as('getTicketsRequest');
      // Mock response
      cy.intercept('POST', '/api/v1/login', { fixture: 'login.json' })
        .as('loginRequest');
      cy.intercept('GET', '/api/v1/tickets', { fixture: 'tickets.json' })
        .as('getTicketsRequest');
      cy.get('[data-cy=username]').type('test');
      cy.get('[data-cy=password]').type('test1234');
      cy.get('[data-cy=btn]').click();
      // cy.wait(8000);
      cy.wait(['@loginRequest', '@getTicketsRequest'], { timeout: 10000 });
      cy.url().should('not.contain', '/login');
    });

    it('commands & screenshots', () => {
      cy.typeLogin('test', 'test1234');
      cy.screenshot('[data-cy=username]');
    });
  });
});
