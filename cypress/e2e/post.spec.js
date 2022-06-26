/// <reference types="cypress" />
import { invalidCharacters } from '../fixtures/characters.json'
describe('POST /characters', () => {
    it('Deve cadastrar um personagem', () => {
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(res => {
                expect(res.status).to.eql(201);
                expect(res.body.character_id.length).to.be.equal(24)
            })
    })

    context('Quando o personagem já existe', () => {
        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['Vingadores da costa oeste', 'Irmandade de mutantes'],
            active: true
        }

        before(() => {
            cy.postCharacter(character)
                .then(res => {
                    expect(res.status).to.eql(201);
                    expect(res.body.character_id.length).to.be.equal(24)
                })
        })

        it('Não deve cadastrar duplicado', () => {
            cy.postCharacter(character)
                .then(res => {
                    expect(res.status).to.be.eql(400)
                    expect(res.body.error).to.be.eql('Duplicate character')
                })
        })
    })

    context('Obrigatoriedade dos campos', () => {
        invalidCharacters.forEach(character => {
            it(`O campo '${character.campo}' deve ser obrigatório`, () => {
                cy.postCharacter(character)
                    .then(res => {
                        expect(res.status).to.be.eql(400)
                        expect(res.body.validation.body.message)
                            .to.be.eql(`"${character.campo}" is required`)
                    })
            })
        })
    })
})