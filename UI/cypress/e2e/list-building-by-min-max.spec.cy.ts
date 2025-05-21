describe('list building page test',() =>{
  beforeEach(() => {
  cy.visit('/list-buildings-by-min-max-number-of-floors')
  });
  
  it('should navigate through the stepper and list a building', () => {

    cy.get('[formControlName=firstCtrl]').type('1'); 
    
    cy.get('[formControlName=secondCtrl]').type('4');

    cy.get('button').contains('Next').click();

    // Add any assertions related to the result of the floor creation if needed

  });
});