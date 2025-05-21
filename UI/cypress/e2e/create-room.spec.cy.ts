describe('Create Room',() => {
    beforeEach(() => {
    cy.visit('/create-room')
    });
    
    it('should navigate through the stepper and create a room', () => {
  
      cy.get('[formControlName=firstCtrl]').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('A').click();

      cy.get('button').contains('Next').click({force: true});
  
      cy.get('[formControlName=secondCtrl]').click(); // Click to open the mat-select dropdown
      cy.get('mat-option').contains('1').click();
  
      cy.get('button').contains('Next').click({force: true});

      cy.get('[formControlName=thirdCtrl]').type('B105');
      cy.get('[formControlName=fourthCtrl]').type('Lab1');
      cy.get('[formControlName=fifthCtrl]').type('dsaaadsa');

      cy.get('button').contains('Next').click({force: true});
  
      cy.get('button').contains('Create').click();
  
    });
  });