describe('edit floor page test',() =>{
  beforeEach(() => {
  cy.visit('/edit-floor')
  });
  
  it('should navigate through the stepper and edit a floor', () => {

    cy.get('[formControlName=firstCtrl]').click(); // Click to open the mat-select dropdown
    cy.get('mat-option').contains('A').click();

    cy.get('button').contains('Next').click();

    cy.get('[formControlName=secondCtrl]').click(); // Click to open the mat-select dropdown
    cy.get('mat-option').contains('1').click();

    cy.get('button').contains('Next').click({force:true });


    cy.get('[formControlName=fourthCtrl]').type('1');
    cy.get('[formControlName=fifthCtrl]').type('T ROOMS');


    cy.get('button').contains('Next').click({force:true });

    cy.get('button').contains('Create').click();

    // Add any assertions related to the result of the floor creation if needed

  });
});