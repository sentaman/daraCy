import data from "../fixtures/data.json"
import authModule from "../models/authModule"
import sidebarModule from "../models/sidebarModule"
import navigationBarModule from "../models/navigationBarModule"
import signUpModule from "../models/signUpModule"
import boardModule from "../models/boardModule"

Cypress.Commands.add('login', (email, password) => {
    if(email == data.user.emptyString && password == data.user.emptyString) {
        authModule.loginSubmitBtn.click()
    } else if(email == data.user.email && password == data.user.emptyString) {
        authModule.emailInput.clear().type(data.user.email)
        authModule.passwordInput.clear()
        authModule.loginSubmitBtn.click()
    } else if(email == data.user.emptyString && password == data.user.password) {
        authModule.emailInput.clear()
        authModule.passwordInput.clear().type(data.user.password)
        authModule.loginSubmitBtn.click()
    } else if(email == data.user.invalidEmail && data.user.invalidPassword) {
        authModule.emailInput.clear().type(data.user.invalidEmail)
        authModule.passwordInput.clear().type(data.user.invalidPassword)
        authModule.loginSubmitBtn.click()
    } else if(email == data.user.invalidEmail && data.user.password) {
        authModule.emailInput.clear().type(data.user.invalidEmail)
        authModule.passwordInput.clear().type(data.user.password)
        authModule.loginSubmitBtn.click()
    } else if(email == data.user.email && password == data.user.invalidPassword) {
        authModule.emailInput.clear().type(data.user.email)
        authModule.passwordInput.clear().type(data.user.invalidPassword)
        authModule.loginSubmitBtn.click()
    } else if(email == data.user.email && password == data.user.password) {
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('login')
        authModule.emailInput.clear().type(data.user.email)
        authModule.passwordInput.clear().type(data.user.password)
        authModule.loginSubmitBtn.click()
        cy.wait('@login').then((mik) => {
            expect(mik.response.statusCode).be.eq(200)
        })
    } else {
        authModule.loginSubmitBtn.click()
    }
})

Cypress.Commands.add('logout', () => {
    cy.intercept('POST', '**/api/v2/logout').as("logOut")
        sidebarModule.avatarIcon.should('be.visible').click()
        sidebarModule.profileLink.should('be.visible').click({force : true})
        navigationBarModule.logoutBtn.click()
        cy.wait("@logOut").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(201)
        })
})

Cypress.Commands.add('signup', (email, password, numberOfUsers) => {
    if(email == data.user.emptyString && password == data.user.emptyString && numberOfUsers == data.user.emptyString) {
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.submitBtn.click()
    } else if(email == data.user.invalidEmail && password == data.user.emptyString && numberOfUsers == data.user.emptyString) {
        signUpModule.emailInput.clear().type(email)
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.submitBtn.click()
    } else if(email == data.user.invalidEmail && password == data.user.invalidPassword && numberOfUsers == data.user.emptyString){
        signUpModule.emailInput.clear().type(email)
        signUpModule.passwordInput.clear().type(password)
        signUpModule.submitBtn.click()
    } else if(email == data.user.invalidEmail && password == data.user.invalidPassword && numberOfUsers == data.user.invalidNumberOfUsersSignUp) {
        signUpModule.emailInput.clear().type(email)
        signUpModule.passwordInput.clear().type(password)
        signUpModule.numberOfUsersInput.clear().type(numberOfUsers)
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.submitBtn.click()
    } else if(email == data.user.email && password == data.user.password && numberOfUsers == data.user.invalidNumberOfUsersSignUp) {
        signUpModule.emailInput.clear().type(email)
        signUpModule.passwordInput.clear().type(password)
        signUpModule.numberOfUsersInput.clear().type(numberOfUsers)
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.submitBtn.click()
    } else if(email == data.user.email && data.user.invalidPassword && numberOfUsers == data.user.invalidNumberOfUsersSignUp) {
        signUpModule.emailInput.clear().type(email)
        signUpModule.passwordInput.clear().type(password)
        signUpModule.numberOfUsersInput.clear().type(numberOfUsers)
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.submitBtn.click()
    } else if(email == data.user.newEmail, password == data.user.password, numberOfUsers == data.user.correctNumberOfUsersSignUp) {
        cy.intercept('POST','**/api/v2/register').as('signUp')
        signUpModule.emailInput.type(email)
        signUpModule.passwordInput.type(password)
        signUpModule.numberOfUsersInput.type(numberOfUsers)
        signUpModule.submitBtn.click()
        cy.wait('@signUp').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200)
    })
    } else {
        signUpModule.submitBtn.click()
    }
})

Cypress.Commands.add('createBoard', (modalTitle) => {
    if(modalTitle == data.boardModalTitle.firstStepTitle) {
        boardModule.boardTitleInput.type(data.user.firstBoardName)
    } else if(modalTitle == data.boardModalTitle.secondStepTitle) {
        boardModule.checkScrumBtn.click()
    } else if(modalTitle == data.boardModalTitle.thirdStepTitle) {
        boardModule.nextStep.click()
    } else if (modalTitle == data.user.firstBoardName) {
        boardModule.nextStep.click({force : true})
    } else {
        boardModule.nextStep.click()
    }
})

Cypress.Commands.add('deleteBoard', () => {
    boardModule.boardConfigurationBtn.click()
    boardModule.deleteBoardButton.click()
    boardModule.yesButton.should('be.enabled').click()
    boardModule.boardModalOkButton.click()
})

Cypress.Commands.add('openNewBoardModal', () => {
    sidebarModule.hitAddNew.click()
    sidebarModule.hitAddBoard.click()
})