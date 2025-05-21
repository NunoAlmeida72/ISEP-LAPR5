describe('Edit Elevator', () => {
    beforeEach(() => {
      // Navigate to the Angular app
      cy.visit('/edit-elevator'); // Update the URL as needed
    });
  
    it('should navigate through the stepper and edit a elevator', () => {
      // Interact with the create elevator page
      cy.get('[formControlName=firstCtrl]').click();
      cy.get('mat-option').contains('A').click();
     
      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=secondCtrl]:first').click();
      cy.get('mat-option').contains('123').click();
      
      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=thirdCtrl]').type('123');
      cy.get('[formControlName=fourthCtrl]').type('Bra');
      cy.get('[formControlName=fifthCtrl]').type('Mod');
      cy.get('[formControlName=sixthCtrl]').type('123');
      cy.get('[formControlName=seventhCtrl]').type('This is a new elevator');
      
      cy.get('button').contains('Next').click({force: true});

      cy.get('button').contains('Edit').click();
    });
});