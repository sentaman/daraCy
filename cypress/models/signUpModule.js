import data from "../fixtures/data.json"

module.exports = {
    get emailInput() {
        return cy.get("input[type='email']")
    },

    get passwordInput() {
        return cy.get("input[type='password']")
    },

    get showPasswordEyeBtn() {
        return cy.get("button[type='button']")
    }, 

    get numberOfUsersInput() {
        return cy.get("input[name='number_of_users']")
    },

    get checkboxTermsAndCond() {
        return cy.get("span.vs-c-checkbox-check")
    },

    get submitBtn(){
        return cy.get("[data-cy=sign-up-submit-button]")
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

    get goToLoginLink() {
        return cy.get("a[href='/login']")
    },

    get hitMonthlyTab() {
        return cy.get(".vs-c-switch-pricing-plan-list > div:nth-of-type(1)")
    },

    get hitAnnuallyTab() {
        return cy.get(".vs-c-switch-pricing-plan-list > div:nth-of-type(2)")
    },

    get errorEmail() {
        return cy.get(":nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get errorPassword() {
        return cy.get(":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get errorNumbUsers() {
        return cy.get(":nth-child(3) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    get errorTermsCondition() {
        return cy.get(":nth-child(4) > .vs-c-form-item__error-wrapper > .el-form-item__error")
    },

    signUp(email, password, numberOfUsers) {
        cy.signup(email, password, numberOfUsers)
    }
}