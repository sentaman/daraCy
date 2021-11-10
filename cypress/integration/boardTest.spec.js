/// <reference types="cypress" />

import data from "../fixtures/data.json"
import authModule from "../models/authModule"
import sidebarModule from "../models/sidebarModule"
import navigationBarModule from "../models/navigationBarModule"
import boardModule from "../models/boardModule"

describe('Create, edit and delete board', () => {

    before(() => {
        cy.visit('/login')
        authModule.loginModal.should('be.visible').and('contain', 'Log in with your existing account')
        authModule.login(data.user.email, data.user.password)

    })

    after(() => {
        authModule.logout()
        authModule.loginModal.should(($mik) => {
            expect($mik).to.contain('Log in with your existing account')
        })
    })
    
    it('Open New Board modal', () => {
        boardModule.openNewBoardModal()
        boardModule.boardModalTitle
            .should('be.visible')
            .and('contain', 'New Board')
            .and('have.css', 'background-color', 'rgb(78, 174, 147)')

    });

    it('Add board title and move on to the Board Type modal', () =>  {
        boardModule.createBoard(data.boardModalTitle.firstStepTitle)
        boardModule.boardTitleInput.should('have.value', data.user.firstBoardName)
        boardModule.newBoardOrganizationDropdown
            .should('have.length', '1')
            .and('have.value', 'Offspring')
        boardModule.nextStepBoard()
    });
    
    it('Check Scrum on the Board Type modal and proceed to the Board Logo modal', () => {
        boardModule.boardModalTitle.should(($mik) => {
            expect($mik).to.contain('Board Type')
        })
        boardModule.checkScrumBtn.should('not.be.checked')
        boardModule.checkKanbanBtn.should('not.be.checked')
        boardModule.nextStep.should('be.disabled')
        boardModule.createBoard(data.boardModalTitle.secondStepTitle)
        boardModule.nextStepBoard()
    });

    it('Upload boarder logo (optionally) and proceed to the last modal', () => {
        boardModule.boardModalTitle
            .should('be.visible')
            .and('contain', 'Board Logo')
            .and('have.css', 'background-color', 'rgb(78, 174, 147)')
        boardModule.nextStep.should('be.enabled')
        boardModule.createBoard(data.boardModalTitle.thirdStepTitle)
    });

    it('Create a Board', () => {
        boardModule.boardModalTitle
            .should('be.visible')
            .and('contain', 'RHCP')
            .and('have.css', 'background-color', 'rgb(78, 174, 147)')
        boardModule.createBoard(data.user.firstBoardName)
    });
// ovde sam stao
    it('Edit Board title and add description', () => {
        sidebarModule.rhcpBoardLink.should('contain', data.user.firstBoardName)
        sidebarModule.settingsLink.click()
        boardModule.boardTitleInput
            .should('have.value', data.user.firstBoardName)
            .clear().type(data.user.boardName)
            .should('have.value', data.user.boardName)
        boardModule.boardDescriptionInput.clear().type(data.user.boardDescription)
        boardModule.updateButton.should('be.enabled').click({force : true})
    });

    it('Clear board title input field and get error message', () => {
        boardModule.boardTitleInput.clear()
        boardModule.boardTitleErrorMessage
            .should('be.visible')
            .and('contain', 'The board title field is required')
    });

    it('Add 51 char in the board title input field and submit the form', () => {
        boardModule.boardTitleInput.clear().type(data.user.maxCharBoard)
        boardModule.boardTitleMaxCharErrorMessage
            .should('be.visible')
            .and('contain', data.user.boardTitleMaxCharErrorMessage)
    });

    it('Delete created board', () => {
        boardModule.deleteBoard()
        sidebarModule.wholeSidebar.should('not.include.text', data.user.boardName)
    });
});