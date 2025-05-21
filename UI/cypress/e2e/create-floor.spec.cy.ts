describe('create floor page test',() =>{
  beforeEach(() => {
  cy.visit('/create-floor')
  });
  
  it('should navigate through the stepper and create a floor', () => {

    cy.get('[formControlName=firstCtrl]').click(); // Click to open the mat-select dropdown
    cy.get('mat-option').contains('A').click();

    cy.get('button').contains('Next').click();


    cy.get('[formControlName=secondCtrl]').type('5');
    cy.get('[formControlName=thirdCtrl]').type('Floor Description');


    cy.get('button').contains('Next').click({force: true});

    cy.get('button').contains('Create').click();

    // Add any assertions related to the result of the floor creation if needed

  });
});