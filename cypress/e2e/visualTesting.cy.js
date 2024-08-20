describe("visual test", () => {
it("save subject of the command", () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => { 
        cy.wrap(usingTheGrid).toMatchImageSnapshot()
    })
    })
})
