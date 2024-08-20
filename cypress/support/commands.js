// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import cypress = require("cypress")

// const cypress = require("cypress");

// Cypress.Commands.add("goToPage" , (url) => {
//     cy.visit(`/${url}`)
// })

// Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
//     if (typeof text != 'number') {
//     text = text.toLocaleUpperCase()
//     }
//     return originalFn(element, text)
// })

Cypress.Commands.add('loginToApplication', () => {
    cy.visit('/login')
    cy.get('[placeholder="Email"]').type('aunwikaaun@gmsil.com')
    cy.get('[placeholder="Password"]').type('12345')
    cy.contains('button','Sign in').click()
})

Cypress.Commands.add('loginToApplicationApiTest', () => {
    const bodyLogin = {
        "user": { 
            "email": "aunwikaaun@gmsil.com",
            "password": "123456"
            }
        }
        cy.log('Email');
        cy.log('Password');
    
        cy.request({
            method: 'POST',
            url: 'https://api.realworld.io/api/users/login',
            body: {
                user: {
                    email: Cypress.env('email'),
                    password: Cypress.env('password')
                }
            },
            failOnStatusCode: false
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                if (response.body && response.body.user && response.body.user.token) {
                    const token = response.body.user.token;
                    cy.wrap(token).as('token'); // ตั้งค่า alias @token
                } else {
                    cy.log('No token found in response.');
                }
            } else {
                cy.log('Login failed with status:', response.status);
            }
        });
        
        // ใช้งาน alias หลังจากมันถูกตั้งค่าแล้ว
        cy.get('@token').then(token => {
            cy.visit('/', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('jwtToken', token);
                }
            });
        });
    })