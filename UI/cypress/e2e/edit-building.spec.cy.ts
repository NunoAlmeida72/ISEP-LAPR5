describe('create building page test',() =>{
  beforeEach(() => {
  cy.visit('/edit-building')
  });
  
  it('should navigate through the stepper and create a building', () => {

    cy.get('[formControlName=firstCtrl]').click(); // Click to open the mat-select dropdown
    cy.get('mat-option').contains('As').click();

    cy.get('button').contains('Next').click();


    cy.get('[formControlName=secondCtrl]').type('As');
    cy.get('[formControlName=thirdCtrl]').type('As');
    cy.get('[formControlName=forthCtrl]').type('Description');
    cy.get('[formControlName=fifthCtrl]').type('8');
    cy.get('[formControlName=sixthCtrl]').type('2');


    cy.get('button').contains('Next').click({force: true});

    cy.get('button').contains('Create').click();

    // Add any assertions related to the result of the floor creation if needed

  });
});