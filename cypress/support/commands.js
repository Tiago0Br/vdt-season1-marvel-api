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

// GET /characters
Cypress.Commands.add('getCharacters', () => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(res => res)
})

// GET /characters/id
Cypress.Commands.add('getCharacterById', id => {
    cy.api({
        method: 'GET',
        url: `/characters/${id}`,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(res => res)
})

// DELETE /characters/id
Cypress.Commands.add('deleteCharacterById', id => {
    cy.api({
        method: 'DELETE',
        url: `/characters/${id}`,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(res => res)
})

// GET /characteres com a Query String "name"
Cypress.Commands.add('searchCharacters', name => {
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: {
            name
        },
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(res => res)
})

Cypress.Commands.add('populateCharacters', characters => {
    characters.forEach(cy.postCharacter)
})