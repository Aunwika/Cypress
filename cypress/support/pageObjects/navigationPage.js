export class navigationPage {
    FormLayoutPage () {
    selectGroupMenu("Forms")
    cy.contains("Form Layouts").click()
}

    DatepickerPage () {
    selectGroupMenu("Forms")
    cy.contains("Datepicker").click()
}

    toastrPage(){
    selectGroupMenu("Modal & Overlays")
    cy.contains("Toastr").click()
}

    smartTablePage(){
    selectGroupMenu("Tables & Data")
    cy.contains("Smart Table").click()
}

    tootipsPage(){
    selectGroupMenu("Modal & Overlays")
     cy.contains("Tooltip").click()
}
}

function selectGroupMenu (groupName){
cy.contains('a', groupName).then(menu => {
    cy.wrap(menu).find('.expand-state g g').invoke('attr','data-name').then(attr => {
        if (attr.includes('left')) {
            cy.wrap(menu).click()
        }
    })    
})
}

export const onNavigationPage = new navigationPage ()
