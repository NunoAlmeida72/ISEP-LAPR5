describe('create building page test',() =>{
  beforeEach(() => {
  cy.visit('/create-building')
  });
  
  it('should navigate through the stepper and create a building', () => {


    cy.get('[formControlName=firstCtrl]').type('As');
    cy.get('[formControlName=secondCtrl]').type('As');
    cy.get('[formControlName=thirdCtrl]').type('Description');
    cy.get('[formControlName=forthCtrl]').type('8');
    cy.get('[formControlName=fifthCtrl]').type('2');


    cy.get('button').contains('Next').click({force: true});

    cy.get('button').contains('Create').click();

    // Add any assertions related to the result of the floor creation if needed

  });
});