describe('List Floors With Elevators', () => {
    beforeEach(() => {
      // Navigate to the Angular app
      cy.visit('/list-floors-with-elevator'); // Update the URL as needed
    });
  
    it('should navigate through the stepper and list floors', () => {
      // Interact with the create elevator page
      cy.get('[formControlName=firstCtrl]').click();
      cy.get('mat-option').contains('A').click();
     
      cy.get('button').contains('Next').click({force: true});
    });
});