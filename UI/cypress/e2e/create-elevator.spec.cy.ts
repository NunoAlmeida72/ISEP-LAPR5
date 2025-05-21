describe('Create Elevator', () => {
    beforeEach(() => {
      // Navigate to the Angular app
      cy.visit('/create-elevator'); // Update the URL as needed
    });
  
    it('should navigate through the stepper and create a elevator', () => {
      // Interact with the create elevator page
      cy.get('[formControlName=firstCtrl]').click();
      cy.get('mat-option').contains('A').click();
     
      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=secondCtrl]').click();
      cy.get('mat-option').contains('1').click();
      
      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=thirdCtrl]').type('123');
      cy.get('[formControlName=fourthCtrl]').type('Bra');
      cy.get('[formControlName=fifthCtrl]').type('Mod');
      cy.get('[formControlName=sixthCtrl]').type('123');
      cy.get('[formControlName=seventhCtrl]').type('This is a new elevator');
      
      cy.get('button').contains('Next').click({force: true});

      cy.get('button').contains('Create').click();
    });
});
  