/// <reference types="cypress" />

import loginPage from "../fixtures/login.json"
import data from "../fixtures/data.json"
import sidebar from "../fixtures/sidebar.json"
import navigationBar from "../fixtures/navigationBar.json"

describe('Login flow' , () => {

    it('visit vivify scrum', () => {
        cy.visit('/login', { timeout: 30000 })
    });

    it('submit logIn form without credentials', () => {
        cy.get(loginPage.loginSubmitBtn).click()
    });

    it('submit login form with valid email only', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear()
        cy.get(loginPage.loginSubmitBtn).click()
    });

    it('submit login form with valid password only', () => {
        cy.get(loginPage.emailInput).clear()
        cy.get(loginPage.emailInput).clear().type(data.user.password)
        cy.get(loginPage.loginSubmitBtn).click()
    });

    it('submit login form with invalid email and invalid password', () => {
        cy.get(loginPage.emailInput).type(data.user.invalidEmail)
        cy.get(loginPage.passwordInput).type(data.user.invalidPassword)
        cy.get(loginPage.loginSubmitBtn).click()
    });

    it('submit login form with invalid email and valid password', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.invalidEmail)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.loginSubmitBtn).click()
    });

    it('submit login form with valid email and invalid password', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.user.invalidPassword)
        cy.get(loginPage.loginSubmitBtn).click()
    });

    it('successfully login user', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.loginSubmitBtn).click()
    });

    it('logOut user', () => {
        cy.get(sidebar.mainSidebar.avatarIcon).click()
        cy.get(sidebar.accountSidebar.profileLink).click()
        cy.get(navigationBar.logoutBtn).click()
    })
})