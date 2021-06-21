
describe('Example', () => {
  it('basic test example', () => {
    cy.visit('http://localhost:8080');
    cy.contains('h2', 'TPV-APP');
    cy.get('[data-cy=btn]').should('be.visible');
  });
});

describe('Best practices', () => {
  it('basic test example', () => {
    // ❌
    cy.visit('http://localhost:8080');
    // ✅
    // cy.visit('/');
    // Don't repeat viewport on each test ❌
    // Save your viewport config in the cypress.json file ✅
    // cy.viewport(550, 750); // Set viewport to 550px x 750px
    // cy.viewport('iphone-6'); // Set viewport to 375px x 667px
    cy.contains('h2', 'TPV-APP');
  });

  beforeEach(() => {
    // Recommendation visit the website before each test
    // instead of adding the command on each test
    cy.visit('/');
  });

  // Don't use html tags, ids or classes as a selector value ❌
  it('Selector with classes', () => {
    cy.get('.login input')
      // we have to specify this to differentiate between username/password
      .eq(0);
  });

  // User data-cy selector value ✅
  it('Selector with data-cy', () => {
    cy.get('[data-cy=username]');
  });

  // Unit test pattern
  // Don't separate in different tests the assertions ❌
  it('get login title', () => {
    cy.contains('h2', 'TPV-APP');
  });

  it('username test should be visible', () => {
    const usernameText = 'username';
    cy.get('[data-cy=username]')
      .type(usernameText)
      .should('have.value', usernameText);
  });

  it('password test should be visible', () => {
    const passwordText = 'password';
    cy.get('[data-cy=password]')
      .type(passwordText)
      .should('have.value', passwordText);
  });

  // write in a single one ✅
  it('should show login screen & inputs', () => {
    const usernameText = 'username';
    const passwordText = 'password';
    cy.contains('h2', 'TPV-APP');
    cy.get('[data-cy=username]')
      .type(usernameText)
      .should('have.value', usernameText);

    // cy.pause();


    cy.get('[data-cy=password]')
      .type(passwordText)
      .should('have.value', passwordText);
  });

  // Assign variables
  // Don't assign to a variable it won't work ❌
  it('Assign variable to let and const', () => {
    const selector = cy.get('[data-cy=username]');

    selector.type('username');
    cy.log(`Length element ${selector.length}`);
  });

  // Do not use async await ❌
  it('Do not use async await', async () => {
    const selector = await cy.get('[data-cy=username]');

    selector.type('username');
  });

  // you have to use Aliases ✅
  it('Assign variable to let and const', () => {
    cy.get('[data-cy=username]')
      .as('username');

    cy.get('@username')
      .type('username')
      .then((element) => {
        console.log(element);
      });
  });

  // Random wait
  // Don't use random wait to avoid flaky tests ❌
  it('add random wait after login', () => {
    cy.intercept('POST', '/api/v1/login', { fixture: 'login.json' });
    cy.intercept('GET', '/api/v1/tickets', { fixture: 'tickets.json' });
    const username = 'username';
    const password = 'secreto';
    cy.get('[data-cy=username]')
      .type(username)
      .should('have.value', username);
    cy.get('[data-cy=password]')
      .type(password)
      .should('have.value', password);
    cy.get('[data-cy=btn]').click();
    cy.wait(3000);
    cy.url().should('not.contain', '/login');
  });

  // Don't use random wait to avoid flaky tests ✅
  it('add intercept routes with aliases', () => {
    cy.intercept('POST', '/api/v1/login', { fixture: 'login.json' })
      .as('loginRequest');
    cy.intercept('GET', '/api/v1/tickets', { fixture: 'tickets.json' })
      .as('getTicketsRequest');
    const username = 'username';
    const password = 'secreto';
    cy.get('[data-cy=username]')
      .type(username)
      .should('have.value', username);
    cy.get('[data-cy=password]')
      .type(password)
      .should('have.value', password);
    cy.get('[data-cy=btn]').click();
    cy.wait(['@loginRequest', '@getTicketsRequest']);
    cy.url().should('not.contain', '/login');
  });

  // Commands
  it('login with command', () => {
    cy.typeLogin('test', 'test1234');
  });

  // Env variable
  it('env variable', () => {
    cy.log(`My env is ${Cypress.env('my_secret')} ${process.env.MY_SECRET}`);
  });
});
