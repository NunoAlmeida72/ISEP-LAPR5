describe('Create Robot', () => {
    beforeEach(() => {
      // Navigate to the Angular app
      cy.visit('/create-robot'); // Update the URL as needed
    });
  
    it('should navigate through the stepper and create a robot', () => {
      // Interact with the create elevator page
      cy.get('[formControlName=firstCtrl]').click();
      cy.get('mat-option').contains('RobotsSecurity').click();
     
      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=secondCtrl]').type('abc')
      cy.get('[formControlName=thirdCtrl]').type('ole');
      cy.get('[formControlName=fourthCtrl]').type('Bra');
      cy.get('[formControlName=fifthCtrl]').type('robo');
      
      cy.get('button').contains('Next').click({force: true});

      cy.get('button').contains('Create').click();
    });
});
  