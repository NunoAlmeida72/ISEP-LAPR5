describe('List Building Connections',() => {
    beforeEach(() => {
    cy.visit('/list-building-connections')
    });
    
    it('should navigate through the stepper and list building connections', () => {
  
      cy.get('[formControlName=firstCtrl]').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('D').click();
      cy.get('[formControlName=secondCtrl]').click();
      cy.get('mat-option').contains('C').click();
  
      cy.get('button').contains('Next').click({force: true});
  
    });
  });