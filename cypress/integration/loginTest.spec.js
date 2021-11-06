/// <reference types="cypress" />

import data from "../fixtures/data.json"
import authModule from "../models/authModule"

describe('Login flow' , () => {

    it.only('visit login page', () => {
        cy.visit('/login', { timeout: 30000 })
    })

    it.only('submit logIn form without credentials', () => {
        authModule.loginSubmitBtn.click()
    });

    it('submit login form with valid email only', () => {
        authModule.emailInput.clear().type(data.user.email)
        authModule.passwordInput.clear()
        authModule.loginSubmitBtn.click()
    });

    it('submit login form with valid password only', () => {
        authModule.emailInput.clear()
        authModule.passwordInput.clear().type(data.user.password)
        authModule.loginSubmitBtn.click()
    });

    it('submit login form with invalid email and invalid password', () => {
        authModule.emailInput.clear().type(data.user.invalidEmail)
        authModule.passwordInput.clear().type(data.user.invalidPassword)
        authModule.loginSubmitBtn.click()
    });

    it('submit login form with invalid email and valid password', () => {
        authModule.emailInput.clear().type(data.user.invalidEmail)
        authModule.passwordInput.clear().type(data.user.password)
        authModule.loginSubmitBtn.click()
    });

    it('submit login form with valid email and invalid password', () => {
        authModule.emailInput.clear().type(data.user.email)
        authModule.passwordInput.clear().type(data.user.invalidPassword)
        authModule.loginSubmitBtn.click()
    });

    it('successfully login user', () => {
        authModule.login({});

    });

    it('logout user', () => {
        authModule.logOut();
    })
})