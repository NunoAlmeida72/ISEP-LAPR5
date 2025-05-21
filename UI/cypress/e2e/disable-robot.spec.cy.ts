describe('Create Robot', () => {
    beforeEach(() => {
      // Navigate to the Angular app
      cy.visit('/disable-robot'); // Update the URL as needed
    });
  
    it('should navigate through the stepper and create a robot', () => {
      // Interact with the create elevator page
      cy.get('[formControlName=firstCtrl]').click();
      cy.get('mat-option').contains('abc').click();
      
      cy.get('button').contains('Next').click({force: true});

      cy.get('button').contains('Disable').click();
    });
});