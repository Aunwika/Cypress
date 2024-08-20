describe ('test article web', () => {
    beforeEach('login', () => {
        cy.loginToApplication()
    })

    it('should login sucess', () => {
        cy.log('login sucess')
    })

    it('verify response', () => {
        cy.intercept('POST', 'ttps://api.realworld.io/api/articles/').as('postArticle')

        const title = 'westride QA leaning 15'
        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type(title)
        cy.get('[formcontrolname="description"]').type('westride QA leaning automate')
        cy.get('[formcontrolname="body"]').type('1234567890')
        cy.contains('button','Publish Article').click()

        cy.wait('@postArticle')
        cy.get('@postArticle').then( xhr => {
            console.log(xhr);
            expect(xhr.response.statusCode).to.equal(201)
            expect(xhr.response.body.article.title).to.equal(title)
        })
    })

    it('verify tags response', () => {
        cy.intercept('GET','https://api.realworld.io/api/tags', {fixture: 'tags.json'})
        cy.get('.tag-list').should('contain','cypress')
        .and('contain','test')
        .and('contain','automate')
    })

    it('verify article response', () => {
        cy.intercept('GET','https://api.realworld.io/api/articles*', {fixture: 'article.json'})
        cy.get('app-article-list').each(article => {
            cy.wrap(article).find('h1').eq(0).should('contain','test response 1')
        })
    })  

    it('verify tags response with routeMatcher', () => {
        cy.intercept({method: 'GET', path: 'tags'}, {fixture: 'tags.json'})
        cy.get('.tag-list').should('contain', 'cypress')
        .and('contain', 'automate')
        .and('contain', 'test')
    })  

    it.only('modify request create article', () => { 
        cy.intercept('POST', '**/articles/',(req) => {
        console.log(req);
        req.body.article.title="westride QA learning modify req5"
        }).as('postArticle')

        const title = 'westride QA learning 4' 
        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type(title)
        cy.get('[formcontrolname="description"]').type('westride QA learning automate')
        cy.get('[formcontrolname="body"]').type(' vdjnvdnjvndv') 
        cy.contains('button', ' Publish Article ').click()

        cy.wait('@postArticle')
        cy.get('@postArticle').then(xhr => {
        console.log(xhr);
        expect(xhr.response.statusCode).to.equal(201)
        expect(xhr.response.body.article.title).not.equal(title)
        })
        })
     
    it('call API with cypress', () => {
        const bodyLogin = {
        "user": { 
            "email": "aunwikaaun@gmsil.com",
            "password": "12345"
            }
        }

        const bodyPostArticle = {
            "article" : {
                "title" : "cal API 1",
                "description" : "test",
                "body" : "test",
                "tagList": []
            }
        }

        cy.request('POST','https://api.realworld.io/api/users/login',bodyLogin).then(response => {
            const token = response.body.user.token
            cy.log(token)
            cy.request(
                {
                    url : "https://api.realworld.io/api/articles/",
                    method : "POST",
                    headers : {"Authorization" : `Token ${token}`},
                    body : bodyPostArticle
                }
            ).then(response => {
                expect(response.status).to.equal(201)
            })
        })
    })

    it('call API with cypress', () => {

        const bodyPostArticle = {
            "article" : {
                "title" : "cal API 19",
                "description" : "test",
                "body" : "test",
                "tagList": []
            }
        }

        cy.get('@token').then(token => {
            cy.request(
                {
                    url : "https://api.realworld.io/api/articles/",
                    method : "POST",
                    headers : {"Authorization" : `Token ${token}`},
                    body : bodyPostArticle
                }
            ).then(response => {
                expect(response.status).to.equal(201)
            })
        })  
    // const token = localStorage.getItem('jwtToken')
    // cy.log(token)

    //     cy.get('@token').then(token => {
    //         cy.request(
    //             {
    //                 url : "https://api.realworld.io/api/articles/",
    //                 method : "POST",
    //                 headers : {"Authorization" : `Token ${token}`},
    //                 body : bodyPostArticle
    //             }
    //         ).then(response => {
    //             expect(response.status).to.equal(201)
    //         })
    //     })  
    // })

})


})