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
        return cy.get("button[type='submit']")
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

    signUp({ email = data.user.email, password = data.user.password, numbOfUsers = data.user.correctNumberOfUsersSignUp} ) {
        cy.intercept('POST','**/api/v2/register').as('signUp')
        this.emailInput.should('be.visible').clear().type(email)
        this.passwordInput.should('be.visible').clear().type(password)
        this.numberOfUsersInput.should('be.visible').clear().type(numbOfUsers)
        this.submitBtn.click()
        cy.wait('@signUp').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200)
        })
    }
}