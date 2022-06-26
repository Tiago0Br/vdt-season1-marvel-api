describe('DELETE /characters/id', () => {
    const character = {
        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: ['Quarteto Fantástico'],
        active: true
    }

    before(() => {
        cy.setToken()
        cy.back2ThePast()
        cy.postCharacter(character).then(({ body }) => {
            Cypress.env('characterId', body.character_id)
        })
    })

    context('Quanto tenho um personagem cadastrado', () => {
        it('Deve remover o personagem pelo id', () => {
            cy.deleteCharacterById(Cypress.env('characterId')).then(res => {
                expect(res.status).to.be.eql(204)
            })
        })

        after(() => {
            cy.getCharacterById(Cypress.env('characterId')).then(res => {
                expect(res.status).to.be.eql(404)
            })
        })
    })

    it('Deve retornar 404 ao tentar remover por um id não cadastrado', () => {
        cy.deleteCharacterById('62b7980b15e35cd77d0d09d0').then(res => {
            expect(res.status).to.be.eql(404)
        })
    })
})