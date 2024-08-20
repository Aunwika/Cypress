import { onDatepickerPage } from "../support/pageObjects/datepickerPage"
import { onFormLayoutPage } from "../support/pageObjects/formLayoutPage"
import { navigationPage, onNavigationPage } from "../support/pageObjects/navigationPage"
import { onSmartTablePage } from "../support/pageObjects/smartTablePage"

describe("Test With page object", () => {
  beforeEach("open application", () => {
    cy.visit('page')
  })

  it.only("Verify navigationPage", () => {
onNavigationPage.FormLayoutPage()
onNavigationPage.DatepickerPage()
onNavigationPage.toastrPage()
onNavigationPage.smartTablePage()
onNavigationPage.tootipsPage()
  })

  it("should submit inline and basic form and tomorrow date in the calendar and edit table",{browser : ["!chrome","electron"]}, () => {
    onNavigationPage.FormLayoutPage()
    onFormLayoutPage.submitInlineFormWithNameAndEmail('test','test@gmail.com')
    onFormLayoutPage.submitBasicFormWithEmailAndPassword('test@gmail.com','123456')
    onNavigationPage.DatepickerPage()
    onDatepickerPage.selectCommonDatePickerDateFormToday(5)
    onNavigationPage.smartTablePage()
    onSmartTablePage.updateAgeByFirstname('John','100')
    onSmartTablePage.addNewRecordWithFirstnameAndLastnameAndAge('test','westride','40')
  })
})

