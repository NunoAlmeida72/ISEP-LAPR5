describe('list floors with connections page test',() =>{
  beforeEach(() => {
  cy.visit('/list-floors-with-connections')
  });
  
  it('should navigate through the stepper and list floors with connections', () => {

    cy.get('[formControlName=firstCtrl]').click(); // Click to open the mat-select dropdown
    cy.get('mat-option').contains('A').click();

    cy.get('button[matStepperNext]').click({ multiple: true });

    cy.get('button').contains('List floors for other building').click();

    // Add any assertions related to the result of the floor creation if needed

  });
});