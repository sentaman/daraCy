/// <reference types="cypress" />

import data from "../fixtures/data.json"
import signUpModule from "../models/signUpModule"

describe('Registration flow', () => {
    
    beforeEach(() => {
        cy.visit("/sign-up", { timeout : 30000 });
    });

    it("submit the form without credentials and unchecked T&C", () => {
        signUpModule.signUp(data.user.emptyString, data.user.emptyString, data.user.emptyString)
        signUpModule.errorEmail.should('contain', data.signupErrorMessages.emailMandatory)
        signUpModule.errorPassword.should('contain', data.signupErrorMessages.passwordMandatory)
        signUpModule.errorNumbUsers.should('contain', data.signupErrorMessages.numbOfUsersMandatory)
        signUpModule.errorTermsCondition.should('contain', data.signupErrorMessages.termsConditionMandatory)
    });

    it("submit the form with invalid email only", () => {
        signUpModule.signUp(data.user.invalidEmail, data.user.emptyString, data.user.emptyString)
        signUpModule.errorEmail.should('contain', data.signupErrorMessages.validEmail)
        signUpModule.errorPassword.should('contain', data.signupErrorMessages.passwordMandatory)
        signUpModule.errorNumbUsers.should('contain', data.signupErrorMessages.numbOfUsersMandatory)
    });

    it("submit the form with invalid email and invalid password", () => {
        signUpModule.signUp(data.user.invalidEmail, data.user.invalidPassword, data.user.emptyString)
        signUpModule.errorEmail.should('contain', data.signupErrorMessages.validEmail)
        signUpModule.errorPassword.should('contain', data.signupErrorMessages.passwordMinChar)
        signUpModule.errorNumbUsers.should('contain', data.signupErrorMessages.numbOfUsersMandatory)
    });

    it("submit the form with invalid credentials (email, password, number of users and unchecked T&C) ", () => {
        signUpModule.signUp(data.user.invalidEmail, data.user.invalidPassword, data.user.invalidNumberOfUsersSignUp)
        signUpModule.errorEmail.should('contain', data.signupErrorMessages.validEmail)
        signUpModule.errorPassword.should('contain', data.signupErrorMessages.passwordMinChar)
        signUpModule.errorNumbUsers.should('contain', data.signupErrorMessages.expectedUsersNumber)
    });

    it("submit the form with valid email, invalid password and invalid number of users and unchecked T&C ", () => {
        signUpModule.signUp(data.user.email, data.user.invalidPassword, data.user.invalidNumberOfUsersSignUp)
        signUpModule.errorPassword.should('contain', data.signupErrorMessages.passwordMinChar)
        signUpModule.errorNumbUsers.should('contain', data.signupErrorMessages.expectedUsersNumber)
        signUpModule.errorTermsCondition.should('contain', data.signupErrorMessages.termsConditionMandatory)
    });

    it("submit the form with valid email, valid password and invalid number of users and unchecked T&C", () => {
        signUpModule.signUp(data.user.email, data.user.password, data.user.invalidNumberOfUsersSignUp)
        signUpModule.errorNumbUsers.should('contain', data.signupErrorMessages.expectedUsersNumber)
        signUpModule.errorTermsCondition.should('contain', data.signupErrorMessages.termsConditionMandatory)
    });

    it("successfully signUp a user", () => {
        signUpModule.signUp(data.user.newEmail, data.user.password, data.user.correctNumberOfUsersSignUp)
    });
});