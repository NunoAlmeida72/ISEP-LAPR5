describe('Create Building Connection',() => {
    beforeEach(() => {
    cy.visit('/create-building-connection')
    });
    
    it('should navigate through the stepper and create a building connection', () => {
  
      cy.get('[formControlName=firstCtrl]').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('A').click();
      cy.get('[formControlName=secondCtrl]').click();
      cy.get('mat-option').contains('B').click();

      cy.get('button').contains('Next').click({force: true});
  
      cy.get('[formControlName=thirdCtrl]').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('1').click();
      cy.get('[formControlName=fourthCtrl]').click();
      cy.get('mat-option').contains('2').click();

  
      cy.get('button').contains('Next').click({force: true});
  
      cy.get('button').contains('Create').click();
  
    });
  });