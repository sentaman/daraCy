/// <reference types="cypress" />

import sidebar from "../fixtures/sidebar.json"
import board from "../fixtures/board.json"
import login from "../fixtures/login.json"
import data from "../fixtures/data.json"
import navigationBar from "../fixtures/navigationBar.json"

describe('Create, edit and delete board', () => {

    before(() => {
        cy.visit('/login')
        cy
            .get(login.loginModal)
            .should('be.visible')
            .and('contain', 'Log in with your existing account')
        
        cy.get(login.emailInput).clear().type(data.user.email)
        cy.get(login.passwordInput).clear().type(data.user.password)
        cy.get(login.loginSubmitBtn).click()

    })

    after(() => {
        cy.get(sidebar.mainSidebar.avatarIcon).click()
        cy.get(sidebar.accountSidebar.profileLink).click({force : true })
        cy.get(navigationBar.logoutBtn).click()

        cy.get(login.loginModal).should(($mik) => {
            expect($mik).to.contain('Log in with your existing account')
        })
    })
    
    it('Open New Board modal', () => {
        cy.get(sidebar.mainSidebar.hitAddNew).click()
        cy.get(sidebar.mainSidebar.hitAddBoard).click()

        cy
            .get(board.createBoardFlow.boardModalTitle)
            .should('be.visible')
            .and('contain', 'New Board')
            .and('have.css', 'background-color', 'rgb(78, 174, 147)')
        
    });

    it('Add board title and move on to the Board Type modal', () =>  {
        cy.get(board.createBoardFlow.boardTitleInput).type('RHCP')
        cy.get(board.createBoardFlow.boardTitleInput).should('have.value', 'RHCP')
        cy
            .get(board.createBoardFlow.newBoardOrganizationDropdown)
            .should('have.length', '1')
            .and('have.value', 'Offspring')

        cy.get(board.createBoardFlow.nextStep).click()
    });
    
    it('Check Scrum on the Board Type modal and proceed to the Board Logo modal', () => {
        cy.get(board.createBoardFlow.boardModalTitle).should(($mik) => {
            expect($mik).to.contain('Board Type')
        })
        cy.get(board.createBoardFlow.checkScrumBtn).should('not.be.checked')
        cy.get(board.createBoardFlow.checkKanbanBtn).should('not.be.checked')
        cy.get(board.createBoardFlow.nextStep).should('be.disabled')

        cy.get(board.createBoardFlow.checkScrumBtn).click()
        cy.get(board.createBoardFlow.nextStep).click()
    });

    it('Upload boarder logo (optionally) and proceed to the last modal', () => {
        cy
            .get(board.createBoardFlow.boardModalTitle)
            .should('be.visible')
            .and('contain', 'Board Logo')
            .and('have.css', 'background-color', 'rgb(78, 174, 147)')
        cy.get(board.createBoardFlow.nextStep).should('be.enabled')
        cy.get(board.createBoardFlow.nextStep).click()
    });

    it('Create a Board', () => {
        cy
            .get(board.createBoardFlow.boardModalTitle)
            .should('be.visible')
            .and('contain', 'RHCP')
            .and('have.css', 'background-color', 'rgb(78, 174, 147)')
        cy.get(board.createBoardFlow.nextStep).click({force : true})
    });

    it('Edit Board title and add description', () => {
        cy.get(sidebar.mainSidebar.rhcpBoardLink).should('contain', 'RHCP')
        cy.get(sidebar.boardSidebar.settingsLink).click()
        cy.get(board.configureBoard.boardTitleInput).should('have.value', 'RHCP')
        cy.get(board.configureBoard.boardTitleInput).clear().type(data.user.boardName)
        cy.get(board.configureBoard.boardTitleInput).should('have.value', data.user.boardName)
        cy.get(board.configureBoard.boardDescriptionInput).clear().type(data.user.boardDescription)
        cy.get(board.configureBoard.updateButton).should('be.enabled')
        cy.get(board.configureBoard.updateButton).click({force : true})
    });

    it('Clear board title input field and get error message', () => {
        cy.get(board.configureBoard.boardTitleInput).clear()
        cy
            .get(board.configureBoard.boardTitleErrorMessage)
            .should('be.visible')
            .and('contain', 'The board title field is required')
    });

    it('Add 51 char in the board title input field and submit the form', () => {
        cy.get(board.configureBoard.boardTitleInput).clear().type(data.user.maxCharBoard)
        cy
            .get(board.configureBoard.boardTitleMaxCharErrorMessage)
            .should('be.visible')
            .and('contain', 'The board title field may not be greater than 50 characters')
    });

    it('Delete created board', () => {
        cy.get(board.configureBoard.deleteBoardButton).click()
        cy
        .get(board.createBoardFlow.boardModalTitle)
        .should('be.visible')
        .and('contain', 'Confirm Your Action')
        cy.get(board.configureBoard.confirmYourActionModal.yesButton).should('be.enabled')
        cy.get(board.configureBoard.confirmYourActionModal.yesButton).click()
        cy.get(board.createBoardFlow.boardModalOkButton).click()
    });
});