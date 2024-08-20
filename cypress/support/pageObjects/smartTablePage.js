export class smartTable {

 updateAgeByFirstname(firstname, age){
  cy.get('tbody').contains('tr', firstname).then(row => {
    cy.wrap(row).find('[class="nb-edit"]').click()
    cy.wrap(row).find('[placeholder="Age"]').clear().type(age)
    cy.wrap(row).find('[class="nb-checkmark"]').click()
    cy.wrap(row).find('td').eq(6).should('contain',age)
  })
}

  addNewRecordWithFirstnameAndLastnameAndAge(firstname,lastname,age){
  cy.get('thead').find('[class="nb-plus"]').click() 
  cy.get('thead').find('tr').eq(2).then(row => {
  cy.wrap(row).find('[placeholder="First Name"]').type(firstname) 
  cy.wrap(row).find('[placeholder="Last Name"]').type(lastname)
  cy.wrap(row).find('[placeholder="Age"]').clear().type(age) 
  cy.wrap(row).find('[class="nb-checkmark"]').click()
})
  cy.get('tbody tr').first().find('td').then(column => {
  cy.wrap(column).eq(2).should('contain', firstname) 
  cy.wrap(column).eq(3).should('contain', lastname) 
  cy.wrap(column).eq(6).should('contain', age)
})
}

}

export const onSmartTablePage = new smartTable()