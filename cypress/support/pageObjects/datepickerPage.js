export class datepickerPage {

    selectCommonDatePickerDateFormToday(dateFormToday){
        let date = new Date()
        date.setDate(date.getDate() + dateFormToday)
        console.log(date);
        let futureDate = date.getDate()
        let futureMonth = date.toLocaleDateString('default', { month: 'short'})
        let futureYear = date.getFullYear()
        let dateAssert = `${futureMonth} ${futureDate}, ${futureYear}`
      
        cy.contains('nb-card', "Common Datepicker").find('input').then(input => {
          cy.wrap(input).click()
      
          function selectDate() {
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAtrribute => {
              if(!dateAtrribute.includes(futureMonth) || !dateAtrribute.includes(futureYear)){
                cy.get('[data-name="chevron-right"]').click()
                selectDate()
              }else{      
                cy.get('.day-cell').not('bounding-month').eq(futureDate).click()
              }
            })
          }
      
          selectDate()
          cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
          cy.wrap(input).should('have.value', dateAssert)
        })
    }


}

export const onDatepickerPage = new datepickerPage()