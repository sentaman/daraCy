import data from "../fixtures/data.json"
import sidebarModule from "../models/sidebarModule"
import navigationBarModule from "../models/navigationBarModule"

module.exports = {
    get loginModal() {
        return cy.get(".vs-c-auth-modal__body");
    },

    get emailInput() {
        return cy.get("input[type='email']");
    },

    get passwordInput() {
        return cy.get("input[type='password']");
    },

    get loginSubmitBtn() {
        return cy.get("button[type='submit']");
    },

    get forgotPasswordLink() {
        return cy.get("a[href='/forgot-password']")
    },

    get backToHomeLink() {
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com']")
    },

    get loginWithGpBtn() {
        return cy.get("button.vs-c-btn--gp")
    },

    get loginWithFbBtn() {
        return cy.get("button.vs-c-btn--fb")
    },

    get loginWithTwBtn() {
        return cy.get("button.vs-c-btn--tw")
    },

    get loginWithRegzenBtn() {
        return cy.get("button.vs-c-btn--regzen")
    },

    get goToSignUpLink() {
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com/pricing']")
    },

    get loginErrorEmailMandatory() {
        return cy.get(":nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get loginErrorPasswordMandatory() {
        return cy.get(":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get emailPasswordIncorect() {
        return cy.get(":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get minCharPasswordError() {
        return cy.get(":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    login(email, password) {
        cy.login(email, password)
    },

    logout() {
        cy.logout()
    }
}