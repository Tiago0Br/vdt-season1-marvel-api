Cypress.Commands.add('setToken', () => {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: Cypress.env('LOGIN')
    }).then(res => {
        expect(res.status).to.be.equal(200)
        Cypress.env('token', res.body.token)
    })
})

Cypress.Commands.add('back2ThePast', () => {
    cy.api({
        method: 'DELETE',
        url: `/back2thepast/${Cypress.env('USER_ID')}`
    }).then(res => {
        expect(res.status).to.be.equal(200)
    })
})

// POST /characters
Cypress.Commands.add('postCharacter', payload => {
    cy.api({
        method: 'POST',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        body: payload,
        failOnStatusCode: false
    }).then(res => res)
})