/// <reference types="cypress" />

import sidebar from "../fixtures/sidebar.json"
import board from "../fixtures/board.json"
import login from "../fixtures/login.json"
import data from "../fixtures/data.json"

describe('Create, edit and delete board', () => {
    
    it('Visit vivify scrum site - login page', () => {
        cy.visit('/login');
    });
    
    it('Login a user and open New Board modal', () => {
        cy.get(login.emailInput).clear().type(data.user.email)
        cy.get(login.passwordInput).clear().type(data.user.password)
        cy.get(login.loginSubmitBtn).click()
        cy.get(sidebar.mainSidebar.hitAddNew).click()
        cy.get(sidebar.mainSidebar.hitAddBoard).click()
    });

    it('Add board title and move on to the Board Type modal', () =>  {
        cy.get(board.createBoardFlow.boardTitleInput).type('RHCP')
        cy.get(board.createBoardFlow.nextStep).click()
    });
    
    it('Check Scrum on the Board Type modal and proceed to the Board Logo modal', () => {
        cy.get(board.createBoardFlow.checkScrumBtn).click()
        cy.get(board.createBoardFlow.nextStep).click()
    });

    it('Upload boarder logo (optionally) and proceed to the last modal', () => {
        cy.get(board.createBoardFlow.nextStep).click()
    });

    it('Create a Board', () => {
        cy.get(board.createBoardFlow.nextStep).click({force : true})
    });

    it('Edit Board title and description', () => {
        cy.get(sidebar.boardSidebar.settingsLink).click()
        cy.get(board.configureBoard.boardTitleInput).clear().type('Clawfinger')
        cy.get(board.configureBoard.boardDescriptionInput).clear().type('Nobody ever suspects the butterfly')
        cy.get(board.configureBoard.updateButton).click({force : true})
    });

    it('Clear board title input field and submit the form', () => {
        cy.get(board.configureBoard.boardTitleInput).clear()
        cy.get(board.configureBoard.updateButton).click({force : true})
    });

    it('Add 51 char in the board title input field and submit the form', () => {
        cy.get(board.configureBoard.boardTitleInput).clear().type(board.maxChar)
        cy.get(board.configureBoard.updateButton).click({force : true})
    });

    it('Delete created board', () => {
        cy.get(board.configureBoard.deleteBoardButton).click()
        cy.get(board.configureBoard.confirmYourActionModal.yesButton).click()
    });

});