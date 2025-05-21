describe('List Robots', () => {
    beforeEach(() => {
      // Navigate to the Angular app
      cy.visit('/list-robots-task-designation'); // Update the URL as needed
    });
  
    it('should navigate through the stepper and list robots', () => {
        // Interact with the create elevator page
      cy.get('[formControlName=firstCtrl]').click();
      cy.get('mat-option').contains('Pickup&Delivery').click();
     
      cy.get('button').contains('Next').click({force: true});
    });
});