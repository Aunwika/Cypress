describe('first test', () => {
  it("test case 1", () => {
    cy.visit("Pages")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()
  
  //by tag name
  cy.get("input")

  //by ID
  cy.get("#inputEmail")

  //by class
  cy.get(".input-full-width")
  
  //by attribute name
  cy.get("[fullwidth]")

  //by attribute name and value
  cy.get('[placeholder="Email"]')

  //by class and value
  cy.get('[class="input-full-width size-medium shape-rectangle"]')

  //by two attribute
  cy.get('[fullwidth][placeholder="Email"]')

  //by tag attribute id and class
  cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

  })

  it("test case 2", () => {
    cy.visit("Pages")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()
  
    //theory
    //get() - find element on the page by locator globally
    //find() - find chlid element by locator
    //contains() - find HTML test and locator

    cy.contains("Sign in")
    cy.contains('[status="warning"]', "Sign in")
    cy.contains('nb-card', "Horizontal form")
    cy.contains('nb-card', "Horizontal form").find('button')
    cy.contains('nb-card', "Horizontal form").get('button')
    cy.contains('nb-card', "Horizontal form").contains('Sign in')
    
    //cypress chains and DOM
    cy.get('#inputEmail3')
    .parents('form')
    .find('button')
    .should('contain', "Sign in")
    .parents('form')
    .find('nb-checkbox')
    .click()
  })

  it("save subject of the command", () => {
    cy.visit("Pages")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

  //const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
  //usingTheGrid.find('for="inputEmail3"').should('contain','Email')
  //usingTheGrid.find('for="inputPassword2"').should('contain','Password')

  //1 cypress alias
  cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
  cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain','Email')
  cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain','Password')

  //2 cypress then() method
  cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
    cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain','Email')
    cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain','Password')
  })
  })

  it("Extracting text value", () => {
    cy.visit("Pages")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()
  
    //1
  cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

  //2
  cy.get('[for="exampleInputEmail1"]').then(label => {
    const labelText = label.text()
    expect(labelText).to.equal('Email address')
  })

  //3
  cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
    expect(text).to.equal('Email address')
  })

  cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain','Email address')

  //4
  cy.get('[for="exampleInputEmail1"]').invoke('attr','class').then(value => {
    expect(value).to.equal('label')
  })

  //5
  cy.get('#exampleInputEmail1').type('test@gmail.com')
  cy.get('#exampleInputEmail1').invoke('prop','value').should('contain','test@gmail.com')
  cy.get('#exampleInputEmail1').invoke('prop','value').then(value => {
    expect(value).to.equal('test@gmail.com')
  })
  })

  it("Redio button", () => {
    cy.visit("Pages")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButton => {
      cy.wrap(radioButton).eq(0).check({force:true}).should('be.checked')
      cy.wrap(radioButton).eq(1).check({force:true})
      cy.wrap(radioButton).eq(0).should('not.be.checked')
      cy.wrap(radioButton).eq(2).should('be.disabled')
  })
  })

  it("Check box", () => {
    cy.visit("Pages")
    cy.contains("Modal & Overlays").click()
    cy.contains("Toastr").click()

    cy.get('[type="checkbox"]').eq(0).click({force:true})
    cy.get('[type="checkbox"]').eq(1).click({force:true})
    cy.get('[type="checkbox"]').eq(2).click({force:true})

  })

  it("Datepicker Basic", () => {
    cy.visit("Pages")
    cy.contains("Forms").click()
    cy.contains("Datepicker").click()

    let date = new Date()
    date.setDate(date.getDate() + 5)
    console.log(date);
    let futureDate = date.getDate()
    let dateAssert = `Jul ${futureDate}, 2024`

    cy.contains('nb-card', "Common Datepicker").find('input').then(input => {
      cy.wrap(input).click()
      cy.get('.day-cell').not('bounding-month').contains(futureDate).click()
      cy.wrap(input).invoke('prop','value').should('contain', dateAssert)
      cy.wrap(input).should('have.value', dateAssert)
    })
  })

  it("Datepicker Advance", () => {
  cy.visit("Pages")
  cy.contains("Forms").click()
  cy.contains("Datepicker").click()

  let date = new Date()
  date.setDate(date.getDate() + 40)
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
          cy.get('.day-cell').not('bounding-month').contains(futureDate).click()
        }
      })
    }

    selectDate()
    cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    cy.wrap(input).should('have.value', dateAssert)
  })
})

it("Dropdown Lists", () => {
  cy.visit("Pages")
  //1
  cy.get('nav nb-select').click()
  cy.get('.options-list').contains('Dark').click()
  cy.get('nav nb-select').should('contain', 'Dark')

  cy.get('nav nb-select').then( dropdown => {
    cy.wrap(dropdown).click()
    cy.get('.options-list nb-option').each(list => {
      cy.wrap(list).click()
      cy.wrap(dropdown).should('contain', list.text())
      cy.wrap(dropdown).click()
    })
  })
})

it("Table", () => {
  cy.visit("Pages")
  cy.contains("Tables & Data").click()
  cy.contains("Smart Table").click()

  //1 get row by text
  cy.get('tbody').contains('tr','Larry').then(row => {
    cy.wrap(row).find('[class="nb-edit"]').click()
    cy.wrap(row).find('[placeholder="Age"]').clear().type('35')
    cy.wrap(row).find('[class="nb-checkmark"]').click()
    cy.wrap(row).find('td').eq(6).should('contain','35')
  })

  //2 get row by index
  cy.get('thead').find('[class="nb-plus"]').click() 
  cy.get('thead').find('tr').eq(2).then(row => {
  cy.wrap(row).find('[placeholder="First Name"]').type('Wesdtride') 
  cy.wrap(row).find('[placeholder="Last Name"]').type('QA')
  cy.wrap(row).find('[placeholder="Age"]').clear().type('35') 
  cy.wrap(row).find('[class="nb-checkmark"]').click()
})
  cy.get('tbody tr').first().find('td').then(column => {
  cy.wrap(column).eq(2).should('contain', 'Wesdtride') 
  cy.wrap(column).eq(3).should('contain', 'QA') 
  cy.wrap(column).eq(6).should('contain', '35')
})
//3
cy.get('thead [placeholder="Age"]').clear().type('20') 
cy.wait(500)
cy.get('tbody tr').each(row => {
  cy.wrap(row).find('td').eq(6).should('contain', '20')
})

const age = [20, 30, 40, 200]
cy.wrap(age).each(age => {
  cy.get('thead [placeholder = "Age"]').clear().type(age)
cy.wait(500)
cy.get('tbody tr').each(row => {
  if (age == 200) {
    cy.wrap(row).should('contain', 'No data found')
  } else {
    cy.wrap(row).find('td').eq(6).should('contain', age)
}
})
})
})

it("Tooltp", () => {
  cy.visit("Pages")
  cy.contains("Modal & Overlays").click()
  cy.contains('Tooltip').click()

  cy.contains('nb-card','Colored Tooltips').contains('Default').click()
  cy.get('nb-tooltip').should('contain','This is a tooltip')
})

it("Tooltp", () => {
  cy.visit("Pages")
  cy.contains('Tables & Data').click()
  cy.contains('Smart Table').click()

  cy.get('tbody tr').first().find('[class="nb-trash"]').click() 
  cy.on('window:confirm', (confirm) => {
  expect(confirm).to.equal('Are you sure you want to delete?')
})
})

})