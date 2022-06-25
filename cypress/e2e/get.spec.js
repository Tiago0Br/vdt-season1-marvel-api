describe('GET /characters', () => {
    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor Xavier',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem aranha',
            team: ['Vingadores'],
            active: true
        }
    ]

    before(() => {
        cy.setToken()
        cy.back2ThePast()
        cy.populateCharacters(characters)
    })

    it('Deve retornar uma lista de personagens', () => {
        cy.getCharacters().then(res => {
            expect(res.status).to.be.eql(200)
            expect(res.body).to.be.a('array')
            expect(res.body.length).to.be.eql(3)
        })
    })

    it('Deve buscar personagem por nome', () => {
        cy.searchCharacters('Logan').then(res => {
            expect(res.status).to.be.eql(200)
            expect(res.body.length).to.be.eql(1)
            expect(res.body[0].alias).to.be.eql('Wolverine')
            expect(res.body[0].team).to.include('X-men')
            expect(res.body[0].active).to.be.true
        })
    })
})

describe('GET /characters/id', () => {
    const character = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: ['Vingadores'],
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
        it('Deve buscar o personagem pelo id', () => {
            cy.getCharacterById(Cypress.env('characterId')).then(res => {
                expect(res.status).to.be.eql(200)
                expect(res.body.name).to.be.eql(character.name)
                expect(res.body.team).to.be.eql(character.team)
                expect(res.body.alias).to.be.eql(character.alias)
            })
        })
    })

    it('Deve retornar 404 ao buscar por um id não cadastrado', () => {
        cy.getCharacterById('62b7980b15e35cd77d0d09d0').then(res => {
            expect(res.status).to.be.eql(404)
        })
    })
})