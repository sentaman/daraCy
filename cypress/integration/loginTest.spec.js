/// <reference types="cypress" />

import data from "../fixtures/data.json"
import authModule from "../models/authModule"

describe('Login flow' , () => {

    beforeEach(() => {
        cy.visit('/login', { timeout: 30000 })
    })

    after(() => {
        authModule.logout();
    })

    it('submit logIn form without credentials', () => {
        authModule.login(data.user.emptyString, data.user.emptyString)
        authModule.loginErrorEmailMandatory.should('contain', data.loginErrorMessages.emailMandatory)
        authModule.loginErrorPasswordMandatory.should('contain', data.loginErrorMessages.passwordRequired)
    });

    it('submit login form with valid email only', () => {
        authModule.login(data.user.email, data.user.emptyString)
        authModule.loginErrorPasswordMandatory.should('contain', data.loginErrorMessages.passwordRequired)
    });

    it('submit login form with valid password only', () => {
        authModule.login(data.user.emptyString, data.user.password)
        authModule.loginErrorEmailMandatory.should('contain', data.loginErrorMessages.emailMandatory)
    });

    it('submit login form with invalid email and invalid password', () => {
        authModule.login(data.user.invalidEmail, data.user.invalidPassword)
        authModule.loginErrorEmailMandatory.should('contain', data.loginErrorMessages.emailMandatory)
        authModule.emailPasswordIncorect.should('contain', data.loginErrorMessages.minCharPasswordError)
    });

    it('submit login form with invalid email and valid password', () => {
        authModule.login(data.user.invalidEmail, data.user.password)
        authModule.loginErrorEmailMandatory.should('contain', data.loginErrorMessages.emailMandatory)
    });

    it('submit login form with valid email and invalid password', () => {
        authModule.login(data.user.email, data.user.invalidPassword)
        authModule.minCharPasswordError.should('contain', data.loginErrorMessages.minCharPasswordError)
    });

    it('successfully login user', () => {   
        authModule.login(data.user.email, data.user.password)
    });
})