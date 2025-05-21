describe('Edit Building Connections',() => {
    beforeEach(() => {
    cy.visit('/edit-building-connections')
    });
    
    it('should navigate through the stepper and edit a building connection', () => {
  
      cy.get('[formControlName=firstCtrl]:first').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('D').click();
      cy.get('[formControlName=secondCtrl]:first').click();
      cy.get('mat-option').contains('C').click();

      cy.get('button').contains('Next').click();
  
      cy.get('[formControlName=thirdCtrl]').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('2 - 2').click();

      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=firstCtrl]:eq(1)').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('2').click();
      cy.get('[formControlName=secondCtrl]:eq(1)').click();
      cy.get('mat-option').contains('3').click();

  
      cy.get('button').contains('Next').click({force: true});
  
      cy.get('button').contains('Edit').click();
  
    });
  });