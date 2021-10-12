/// <reference types="cypress" />
import signUp from "../fixtures/signUp.json"
import data from "../fixtures/data.json"

describe('Registration flow', () => {
    
    it('navigate to signUp page', () => {
        cy.visit("/sign-up", { timeout : 30000 });
    });

    it("submit the form without credentials and unchecked T&C", () => {
        cy.get(signUp.checkboxTermsAndCond).click()
        cy.get(signUp.submitBtn).click()
    });

    it("submit the form with invalid email only", () => {
        cy.get(signUp.emailInput).clear().type(data.user.invalidEmail)
        cy.get(signUp.checkboxTermsAndCond).click()
        cy.get(signUp.passwordInput).clear()
        cy.get(signUp.numberOfUsersInput).clear()
        cy.get(signUp.submitBtn).click()
    });

    it("submit the form with invalid email and invalid password", () => {
        cy.get(signUp.emailInput).clear().type(data.user.invalidEmail)
        cy.get(signUp.passwordInput).clear().type(data.user.invalidPassword)
        cy.get(signUp.numberOfUsersInput).clear()
        cy.get(signUp.submitBtn).click()
    });

    it("submit the form with invalid credentials (email, password, number of users and unchecked T&C) ", () => {
        cy.get(signUp.emailInput).clear().type(data.user.invalidEmail)
        cy.get(signUp.passwordInput).clear().type(data.user.invalidPassword)
        cy.get(signUp.numberOfUsersInput).clear().type('11')
        cy.get(signUp.checkboxTermsAndCond).click()
        cy.get(signUp.submitBtn).click()
    });

    it("submit the form with valid email, invalid password and invalid number of users and unchecked T&C ", () => {
        cy.get(signUp.emailInput).clear().type(data.user.email)
        cy.get(signUp.passwordInput).clear().type(data.user.invalidPassword)
        cy.get(signUp.numberOfUsersInput).clear().type('11')
        cy.get(signUp.submitBtn).click()
    });

    it("submit the form with valid email, valid password and invalid number of users and unchecked T&C", () => {
        cy.get(signUp.emailInput).clear().type(data.user.email)
        cy.get(signUp.passwordInput).clear().type(data.user.password)
        cy.get(signUp.numberOfUsersInput).clear().type('11')
        cy.get(signUp.submitBtn).click()
    });

    it("submit the form with valid email, valid password and valid number of users and unchecked T&C", () => {
        cy.get(signUp.emailInput).clear().type(data.user.email)
        cy.get(signUp.passwordInput).clear().type(data.user.password)
        cy.get(signUp.numberOfUsersInput).clear().type('1')
        cy.get(signUp.checkboxTermsAndCond).click()
    });

    // it("successfully signUp a user", () => {
    //     cy.get(signUp.emailInput).clear().type(data.user.email)
    //     cy.get(signUp.passwordInput).clear().type(data.user.password)
    //     cy.get(signUp.numberOfUsersInput).clear().type('1')
    //     cy.get(signUp.submitBtn).click()
    // });



});