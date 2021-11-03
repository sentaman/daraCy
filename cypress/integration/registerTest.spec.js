/// <reference types="cypress" />

import data from "../fixtures/data.json"
import signUpModule from "../models/signUpModule"


describe('Registration flow', () => {
    
    it('navigate to signUp page', () => {
        cy.visit("/sign-up", { timeout : 30000 });
    });

    it("submit the form without credentials and unchecked T&C", () => {
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.submitBtn.click()
    });

    it("submit the form with invalid email only", () => {
        signUpModule.emailInput.clear().type(data.user.invalidEmail)
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.passwordInput.clear()
        signUpModule.numberOfUsersInput.clear
        signUpModule.submitBtn.click()
    });

    it("submit the form with invalid email and invalid password", () => {
        signUpModule.emailInput.clear().type(data.user.invalidEmail)
        signUpModule.passwordInput.clear().type(data.user.invalidPassword)
        signUpModule.numberOfUsersInput.clear()
        signUpModule.submitBtn.click()
    });

    it("submit the form with invalid credentials (email, password, number of users and unchecked T&C) ", () => {
        signUpModule.emailInput.clear().type(data.user.invalidEmail)
        signUpModule.passwordInput.clear().type(data.user.invalidPassword)
        signUpModule.numberOfUsersInput.clear().type(data.user.invalidNumberOfUsersSignUp)
        signUpModule.checkboxTermsAndCond.click()
        signUpModule.submitBtn.click()
    });

    it("submit the form with valid email, invalid password and invalid number of users and unchecked T&C ", () => {
        signUpModule.emailInput.clear().type(data.user.email)
        signUpModule.passwordInput.clear().type(data.user.invalidPassword)
        signUpModule.numberOfUsersInput.clear().type(data.user.invalidNumberOfUsersSignUp)
        signUpModule.submitBtn.click()
    });

    it("submit the form with valid email, valid password and invalid number of users and unchecked T&C", () => {
        signUpModule.emailInput.clear().type(data.user.email)
        signUpModule.passwordInput.clear().type(data.user.password)
        signUpModule.numberOfUsersInput.clear().type(data.user.invalidNumberOfUsersSignUp)
        signUpModule.submitBtn.click()

    });

    it("submit the form with valid email, valid password and valid number of users and unchecked T&C", () => {
        signUpModule.emailInput.clear().type(data.user.email)
        signUpModule.passwordInput.clear().type(data.user.password)
        signUpModule.numberOfUsersInput.clear().type(data.user.correctNumberOfUsersSignUp)
        signUpModule.submitBtn.click()
        signUpModule.checkboxTermsAndCond.click()
    });

    it("successfully signUp a user", () => {
        signUpModule.signUp({})
    });
});