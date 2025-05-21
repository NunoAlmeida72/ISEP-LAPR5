describe('Accept or Refuse User Registration', () => {
    beforeEach(() => {
        cy.visit('/accept-refuser-user-registration');
    });    
  
    it('should accept a user registration request', () => {
        cy.get('[formControlName=email]').type('1201293@isep.ipp.pt');
        cy.get('[formControlName=password]').type('123456ola');

        cy.get('button').contains('Login').click();

        cy.get('button').contains('Users').click();

        cy.get('[mat-menu="#user"]').contains('User Registration Requests').click();

        cy.get('table').should('be.visible');
  
        const userEmail = 'email@email.com';
    
        cy.contains('td', userEmail)
            .parent('tr')
            .within(() => {
                cy.get('button[mat-icon="check_circle"]').click();
            });
    });
});
