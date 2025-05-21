describe('Create Robot Type', () => {
    beforeEach(() => {
      // Navigate to the Angular app
      cy.visit('/create-robot-type'); // Update the URL as needed
    });
  
    it('should navigate through the stepper and create a robot type', () => {
      // Interact with the create elevator page
      cy.get('[formControlName=firstCtrl]').click();
      cy.get('mat-option').contains('Pickup&Delivery').click();
     
      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=secondCtrl]').type('abc')
      cy.get('[formControlName=thirdCtrl]').type('oled');
      cy.get('[formControlName=fourthCtrl]').type('Bra');
      
      cy.get('button').contains('Next').click({force: true});

      cy.get('button').contains('Create').click();
    });
});
  